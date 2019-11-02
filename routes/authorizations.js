const express = require('express');
const router = express.Router();

const entities = require('../data/entities').models
const firebaseDispatcher = require('../firebase/notif_dispatcher')

const sendNotificationToAffiliate = (title, msg, affiliate_id) => {
    return entities.affiliates.findOne({ where: { id: affiliate_id }})
    .then(affiliate => firebaseDispatcher.sendNotification(
        affiliate.device_token,
        title,
        msg
    ))
}

router.post('/', (req, res) => {
    const { url, path, specialty_id, affiliate_id, authorize } = req.body
    const status = authorize ? 'AUTORIZADO' : 'PENDIENTE'
    return entities.authorizations
    .create({ url, path, specialty_id, affiliate_id, status })
    .then(authorizations => res.json({ id: authorizations.id }))
    .catch(err => res.status(500).json({ error: `Hubo un error al cargar la autorizacion > ${err.message}`}))
})

router.post('/authorize/:id', (req, res) => {
    const id = req.params.id
    return entities.authorizations
    .update({ status: 'AUTORIZADO' }, { returning: true, where: { id } })
    .then(([ _, [authorization] ]) =>
        sendNotificationToAffiliate(
            `Autorización autorizada`,
            `Su autorización ha sido autorizada`,
            authorization.affiliate_id
        )
    )
    .then(() => res.json({ id }))
    .catch(err => res.status(500).json({ error: `Hubo un error al autorizar la autorizacion > ${err.message}`}))
})

router.post('/reject/:id', (req, res) => {
    const id = req.params.id
    return entities.authorizations
    .update({ status: 'RECHAZADO' }, { returning: true, where: { id } })
    .then(([ _, [authorization] ]) =>
        sendNotificationToAffiliate(
            `Autorización rechazada`,
            `Su autorización ha sido rechazada`,
            authorization.affiliate_id
        )
    )
    .then(() => res.json({ id }))
    .catch(err => res.status(500).json({ error: `Hubo un error al rechazar la autorizacion > ${err.message}`}))
})

router.post('/need-information/:id', (req, res) => {
    const id = req.params.id
    return entities.authorizations
    .update({ status: 'NECESITA MAS INFORMACION' }, { returning: true, where: { id } })
    .then(([ _, [authorization] ]) =>
        sendNotificationToAffiliate(
            `Autorización necesita más información`,
            `Su autorización necesita más información`,
            authorization.affiliate_id
        )
    )
    .then(() => res.json({ id }))
    .catch(err => res.status(500).json({ error: `Hubo un error al pedir mas informacion la autorizacion > ${err.message}`}))
})

router.post('/pend/:id', (req, res) => {
    const id = req.params.id
    return entities.authorizations
    .update({ status: 'PENDIENTE' }, { where: { id } })
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