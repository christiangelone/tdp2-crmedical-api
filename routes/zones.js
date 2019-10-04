const express = require('express');
const router = express.Router();

const entities = require('../data/entities').models

router.post('/', (req, res) => {
    const zone = req.body
    entities.zones.create(zone)
        .then(z => res.json({ id: z.id }))
})

router.get('/', (req, res) => {
    entities.zones.findAll({ order: [['name', 'ASC']]})
        .then(zones => res.json(zones))
})

module.exports = router