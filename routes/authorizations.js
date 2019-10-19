const express = require('express');
const router = express.Router();

const entities = require('../data/entities').models

router.post('/', (req, res) => {
    const { url, path, specialty_id, affiliate_id, authorize } = req.body
    const status = authorize ? 'AUTHORIZED' : 'PENDING'
    return entities.authorizations
    .create({ url, path, specialty_id, affiliate_id, status })
    .then(authorizations => res.json({ id: authorizations.id }))
})

router.get('/', (req, res) => {
    const { affiliate_id } = req.params.id
    const where = affiliate_id ? { where: { affiliate_id } } : {}

    entities.authorizations.find({ ...where })
        .then(authorizations => res.json(authorizations))
})


router.get('/:id', (req, res) => {
    const id = req.params.id
    entities.authorizations.findOne({ where: { id } })
        .then(authorization => res.json(authorization))
})

module.exports = router