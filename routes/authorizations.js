const express = require('express');
const router = express.Router();
const moment = require('moment')
const imageHelper = require('../helpers/image')
const uuidv1 = require('uuid/v1')

const entities = require('../data/entities').models
const firebaseDispatcher = require('../firebase/notif_dispatcher')

const firebaseBucket = require('../firebase/bucket_manager')

const sendNotificationToAffiliate = (title, msg, affiliate_id) => {
    return entities.affiliates.findOne({ where: { id: affiliate_id }})
    .then(affiliate => firebaseDispatcher.sendNotification(
        affiliate.device_token,
        title,
        msg
    ))
}

const radiographyId = 2;
/**
 * Intenta autorizar automaticamente una Solicitud de estudio
 * @param {any} authorization Solicitud de autorizacion
 * @returns {Promise} Promesa con autorizacion
 */
function approveAutomatically(anAuthorization){
    /* Por el momento unicamente se aprueban los estudios de tipo radiografia...
    Se debe refinar la logica de autorizaciones automaticas */
    const id = anAuthorization.id;
    if(anAuthorization.authtype_id == radiographyId) {
        return entities.authorizations
            .update({ status: 'AUTORIZADO AUTOMATICAMENTE' }, { returning: true, where: { id } })
            .then(() => entities.authorizations.findOne({ where: { id }, include: [
                { model: entities.specialties, as: 'specialty'},
                { model: entities.authtypes, as: 'authtype'},
            ]}))
            .then(authorization => sendNotificationToAffiliate(
                `Solicitud de estudio aprobada`,
                `Su solicitud creada el ${ moment(authorization.createdAt).format('DD/MM/YYYY') }
                 del estudio para la especialidad ${authorization.specialty.name}
                 fue aprobada!`,
                authorization.affiliate_id
            )).then(() => Promise.resolve(anAuthorization));
    } else {
        return Promise.resolve(anAuthorization);
    }
}

function stampImage(imageUrl, stampUrl) {
    return Promise.all([
        imageHelper.getImgBufferFromUrl(imageUrl),
        imageHelper.getImgBufferFromUrl(stampUrl)
    ])
    .then(([imageBuffer, stampBuffer]) => 
        imageHelper.stampWatermark(imageBuffer, stampBuffer)
    )
}

router.post('/', (req, res) => {
    const { url, path, specialty_id, affiliate_id, authorize, authtype_id } = req.body
    const status = authorize ? 'AUTORIZADO' : 'PENDIENTE'
    return entities.authorizations
    .create({ url, path, specialty_id, affiliate_id, status , authtype_id })
    .then(au => approveAutomatically(au))
    .then(authorizations => res.json({ id: authorizations.id }))
    .catch(err => res.status(500).json({ error: `Hubo un error al cargar la autorizacion > ${err.message}`}))
})

router.post('/authorize/:id', (req, res) => {
    const id = req.params.id
    const { observations } = req.body
    return entities.authorizations
    .update({ status: 'AUTORIZADO', observations }, { returning: true, where: { id } })
    .then(() => Promise.all([
        entities.authorizations.findOne({ where: { id }, include: [
            { model: entities.specialties, as: 'specialty'}
        ]}),
        entities.stamps.findOne({ where: { name: 'AUTORIZADO' }})
    ]))
    .then(([authorization, stamp]) => Promise.all([
        Promise.resolve(authorization),
        stampImage(authorization.url, stamp.url)
    ]))
    .then(([authorization, imageWithStamp]) => Promise.all([
        Promise.resolve(authorization),
        firebaseBucket.uploadFromStream(imageWithStamp, `myhealthapp/checks/authorized/${uuidv1()}.png`)
    ]))
    .then(([authorization, { url }]) => Promise.all([
        Promise.resolve(authorization),
        authorization.update({ url })
    ]))
    .then(([authorization]) => sendNotificationToAffiliate(
        `Solicitud de estudio aprobada`,
        `Su solicitud creada el ${ moment(authorization.createdAt).format('DD/MM/YYYY') }
         del estudio para la especialidad ${authorization.specialty.name}
         fue aprobada!`,
        authorization.affiliate_id
    ))
    .then(() => res.json({ id }))
    .catch(err => res.status(500).json({ error: `Hubo un error al autorizar la autorizacion > ${err.message}`}))
})

router.post('/reject/:id', (req, res) => {
    const id = req.params.id
    const { observations } = req.body
    return entities.authorizations
    .update({ status: 'RECHAZADO', observations }, { returning: true, where: { id } })
    .then(() => Promise.all([
        entities.authorizations.findOne({ where: { id }, include: [
            { model: entities.specialties, as: 'specialty'}
        ]}),
        entities.stamps.findOne({ where: { name: 'RECHAZADO' }})
    ]))
    .then(([authorization, stamp]) => Promise.all([
        Promise.resolve(authorization),
        stampImage(authorization.url, stamp.url)
    ]))
    .then(([authorization, imageWithStamp]) => Promise.all([
        Promise.resolve(authorization),
        firebaseBucket.uploadFromStream(imageWithStamp, `myhealthapp/checks/rejected/${uuidv1()}.png`)
    ]))
    .then(([authorization, { url }]) => Promise.all([
        Promise.resolve(authorization),
        authorization.update({ url })
    ]))
    .then(([authorization]) => sendNotificationToAffiliate(
        `Solicitud de estudio rechazada`,
        `Su solicitud creada el ${ moment(authorization.createdAt).format('DD/MM/YYYY') }
         del estudio para la especialidad ${authorization.specialty.name}
         fue rechazada`,
        authorization.affiliate_id
    ))
    .then(() => res.json({ id }))
    .catch(err => res.status(500).json({ error: `Hubo un error al rechazar la autorizacion > ${err.message}`}))
})

router.post('/need-information/:id', (req, res) => {
    const id = req.params.id
    const { observations } = req.body
    return entities.authorizations
    .update({ status: 'NECESITA MAS INFORMACION', observations }, { returning: true, where: { id } })
    .then(() => entities.authorizations.findOne({ where: { id }, include: [
        { model: entities.specialties, as: 'specialty'}
    ]}))
    .then(authorization => sendNotificationToAffiliate(
        `Solicitud de estudio con observaciones`,
        `Su solicitud creada el ${ moment(authorization.createdAt).format('DD/MM/YYYY') }
         del estudio para la especialidad ${authorization.specialty.name},
         no puede ser aprobada, vea las observaciones del mismo`,
        authorization.affiliate_id
    ))
    .then(() => res.json({ id }))
    .catch(err => res.status(500).json({ error: `Hubo un error al pedir mas informacion la autorizacion > ${err.message}`}))
})

router.post('/pend/:id', (req, res) => {
    const id = req.params.id
    const { observations } = req.body
    return entities.authorizations
    .update({ status: 'PENDIENTE', observations }, { where: { id } })
    .then(() => res.json({ id }))
    .catch(err => res.status(500).json({ error: `Hubo un error al pendear la autorizacion > ${err.message}`}))
})

router.get('/', (req, res) => {
    const { affiliate_id } = req.query
    const where = affiliate_id ? { where: { affiliate_id } } : {}

    entities.authorizations.findAll({
        ...where,
        include: [
            {
                model: entities.affiliates,
                as: 'affiliate',
                attributes: [
                    'id',
                    'idn',
                    'affiliate_id',
                    'firstname',
                    'lastname',
                    'plan'
                ]
            },
            {
                model: entities.specialties,
                as: 'specialty',
                attributes: ['name']
            },
            {
                model: entities.authtypes,
                as: 'authtype',
                attributes: ['name']
            }
        ]
    })
        .then(authorizations => res.json(authorizations))
})


router.get('/:id', (req, res) => {
    const id = req.params.id
    entities.authorizations.findOne({
        where: { id },
        include: [
            {
                model: entities.affiliates,
                as: 'affiliate',
                attributes: [
                    'id',
                    'idn',
                    'affiliate_id',
                    'firstname',
                    'lastname',
                    'plan'
                ]
            },
            {
                model: entities.specialties,
                as: 'specialty',
                attributes: ['name']
            },
            {
                model: entities.authtypes,
                as: 'authtype',
                attributes: ['name']
            }
        ]
    })
        .then(authorization => {
            if(authorization) res.json(authorization)
            else res.status(404).json({
                error: `Hubo un error al obtener la autorizacion > La autorizacion no existe`
            })
        })
})

module.exports = router