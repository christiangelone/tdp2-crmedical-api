const express = require('express');
const router = express.Router();

const entities = require('../data/entities')

router.get('/', (req, res) => {
    entities.zone.findAll({ order: [['name', 'ASC']]})
        .then(zones => res.json(zones.map(z => z.name)))
})

module.exports = router