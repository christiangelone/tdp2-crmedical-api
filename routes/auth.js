const express = require('express');
const router = express.Router();

const entities = require('../data/entities')
const jwt = require('jsonwebtoken')
const secret = 'TOPSECRETTOP'

const mailers = require('../mailers')

router.post('/login', function (req, res) {
    const { idn, password, role } = req.body
    entities[role].findOne({
        where: { idn },
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
    }).then(user => {
        if (!user) return res.status(400).json({ error: "DNI y/o password incorrecto"})
        if (password !== user.hashed_password) return res.status(400).json({ error: "DNI y/o password incorrecto"})
        
        user.hashed_password = undefined
        const token = jwt.sign({ idn, role }, secret, )
        return res.json({ user, token })
    })
})

router.post('/register', function (req, res) {
    const { info, role } = req.body
    info.hashed_password = info.password
    entities[role].create(info)
        .then(user => {
            console.log(JSON.stringify(user, null, 2))
            mailers.sendWelcomeEmail({ user })
        })
        .then(_ => res.status(200).end())
        .catch(err => res.send({ error: `Hubo un error al registrar el usuario > ${ err }`}))
})

module.exports = router