const express = require('express');
const router = express.Router();
const sequelize = require('sequelize')
const entities = require('../data/entities').models

const getFilters = (query, filters) => {
    const someFilters = filters.reduce((filter, value) => {
        if(query[value]) filter[value] = query[value]
        return filter
    }, {})
    return (Object.values(someFilters).length > 0 ? { where: someFilters } : {})
}

router.post('/', (req, res) => {
    const { type, name, languages, emails, plan, specialties, offices} = req.body
    return entities.lenders.create({
        type,
        name,
        languages: languages.join(','),
        emails: emails.join(','),
        plan
    })
        .then(lender => Promise.resolve(lender.id))
        .then(lender_id => console.log(lender_id) || Promise.all([
            Promise.resolve(lender_id),
            offices.map(o => entities.offices.create({
                ...o,
                lender_id
            })),
            specialties.map(s_id => entities.lender_specialty.create({
                specialty_id: s_id,
                lender_id
            }))
        ]))
        .then(([lender_id]) => res.json({ id: lender_id }))
        .catch(err => res.status(500).json({ error: `Hubo un error al cargar el prestador > ${err.message}`}))
})

router.get('/', (req, res) => {
    const primaryFilters = getFilters(req.query,['type', 'plan', 'name'])
    const secondaryFilters = getFilters(req.query,['specialty', 'zone'])
    
    if(primaryFilters.where && primaryFilters.where.plan)
        primaryFilters.where.plan = {
            [sequelize.Op.gte]: primaryFilters.where.plan
        }

    return entities.lenders.findAll({
        ...primaryFilters,
        include: [
            {
                required: true,
                model: entities.specialties,
                as: 'specialties',
                ...(secondaryFilters.where && secondaryFilters.where.specialty
                        ? { where: { id: secondaryFilters.where.specialty }}
                        : {}
                    ),
                through: { attributes: [] },
                attributes: ['name']
            },
            {
                required: true,
                model: entities.offices,
                as: 'offices',
                include: [
                    {
                        required: true,
                        model: entities.zones,
                        as: 'zone',
                        ...(secondaryFilters.where && secondaryFilters.where.zone
                            ? { where: { id: secondaryFilters.where.zone }}
                            : {}
                        ),
                        attributes: ['name']
                    }
                ]
            },
        ],
        order: [['name', 'ASC']]
    })
    .then(lenders => res.json(lenders.map(l => ({
            id: l.id,
            type: l.type,
            name: l.name,
            plan: l.plan,
            emails: l.emails.split(','),
            languages: l.languages.split(','),
            specialties: l.specialties.map(s => s.name),
            offices: l.offices.map(o => ({
                id: o.id,
                address: o.address,
                phone: o.phone,
                lat: o.lat,
                lon: o.lon,
                zone: o.zone.name
            }))
        })
    )))
    .catch(err => res.status(500).json({ error: `Hubo un error al obtener los prestadores > ${err.message}`}))
})

module.exports = router