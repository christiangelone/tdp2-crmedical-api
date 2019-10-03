const express = require('express');
const router = express.Router();

const entities = require('../data/entities')

router.get('/', (req, res) => {
    entities.specialty.findAll({ order: [['name', 'ASC']]})
        .then(specialties => res.json(specialties.map(s => s.name)))
})

module.exports = router