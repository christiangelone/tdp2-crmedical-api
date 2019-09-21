const express = require('express');
const router = express.Router();
const config = require('../config')

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

    entities[role]
        .findOne({ where: { idn: info.idn } })
        .then(user => {
            if (user) {
                mailers.sendWelcomeEmail({ user }, config.isTesting)
                return res.status(200).json({ message: 'Registro exitoso' })
            }
            if(role === 'affiliate') {
                return entities.authorized_affiliate
                    .findOne({ where: { idn: info.idn } })
                    .then(affiliate => {
                        if(!affiliate) throw new Error('Usted no es un afiliado autorizado')
                        if(info.plan !== affiliate.plan) throw new Error(`Usted no esta afiliado con el plan '${ info.plan }'`)
                        if(info.affiliate_id !== affiliate.affiliate_id) throw new Error(`Usted no esta afiliado con este numero de afiliado '${ info.affiliate_id }'`)
                        entities[role]
                            .create(info)
                            .then(user => { mailers.sendWelcomeEmail({ user }, config.isTesting) })
                            .then(_ => res.status(200).json({ message: 'Registro exitoso' }))
                    })
            } else {
                return entities[role]
                            .create(info)
                            .then(_ => res.status(200).json({ message: 'Registro exitoso' }))
            }
            
        })
        .catch(err => res.status(400).json({ error: `Hubo un error al registrarte > ${ err.message }`}))
})

module.exports = router