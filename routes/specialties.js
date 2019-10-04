const express = require('express');
const router = express.Router();

const entities = require('../data/entities').models

router.post('/', (req, res) => {
    const specialty = req.body
    entities.specialties.create(specialty)
        .then(s => res.json({ id: s.id }))
})

router.get('/', (req, res) => {
    entities.specialties.findAll({ order: [['name', 'ASC']]})
        .then(specialties => res.json(specialties))
})

module.exports = router