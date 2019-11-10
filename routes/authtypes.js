const express = require('express');
const router = express.Router();

const entities = require('../data/entities').models

router.post('/', (req, res) => {
    const authtype = req.body
    entities.authtypes.create(authtype)
        .then(z => res.json({ id: z.id }))
})

router.get('/', (req, res) => {
    entities.authtypes.findAll({ order: [['name', 'ASC']] })
        .then(authtypes => res.json(authtypes))
})

module.exports = router