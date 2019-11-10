const express = require('express');
const router = express.Router();
const config = require('../config')

const entities = require('../data/entities').models
const jwt = require('jsonwebtoken')
const secret = 'TOPSECRETTOP'

const mailers = require('../mailers')

const boUsers = [
    {
        email: 'admin@myhealthapp.com',
        password: 'admin',
        role: 'admin'
    },
    {
        email: 'auditor@myhealthapp.com',
        password: 'auditor',
        role: 'auditor'
    }
]

router.post('/bo/login', (req, res) => {
    const { email, password } = req.body
    const user = boUsers.findOne(u => u.email === email && u.password === password)
    if(user){
        const token = jwt.sign({ idn, role }, secret, )
        return res.json({ user, token })
    }
    else return res.status(400).json({ error: "DNI y/o password incorrecto"})
})

router.post('/login', (req, res) => {
    const { idn, password, role, device_token } = req.body
    entities[role + 's'].findOne({
        where: { idn },
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    }).then(user => {
        if (!user) return res.status(400).json({ error: "DNI y/o password incorrecto"})
        if (password !== user.hashed_password) return res.status(400).json({ error: "DNI y/o password incorrecto"})
        
        if(device_token) user.update({ device_token })
        user.hashed_password = undefined
        const token = jwt.sign({ idn, role }, secret, )
        return res.json({ user, token })
    })
})

router.post('/register', (req, res) => {
    const { info, role } = req.body
    info.hashed_password = info.password

    entities[role + 's']
        .findOne({ where: { idn: info.idn } })
        .then(user => {
            if (user) {
                mailers.sendWelcomeEmail({ user }, config.isTesting)
                return res.status(200).json({ message: 'Registro exitoso' })
            }
            if(role === 'affiliate') {
                return entities.authorized_affiliates
                    .findOne({ where: { idn: info.idn } })
                    .then(affiliate => {
                        if(!affiliate) throw new Error('Usted no es un afiliado autorizado')
                        if(info.plan !== affiliate.plan) throw new Error(`Usted no esta afiliado con el plan '${ info.plan }'`)
                        if(info.affiliate_id !== affiliate.affiliate_id) throw new Error(`Usted no esta afiliado con este numero de afiliado '${ info.affiliate_id }'`)
                        if(affiliate.expires < new Date()) throw new Error(`Usted tiene su afiliacion vencida`)
                        entities[role + 's']
                            .create(info)
                            .then(user => { mailers.sendWelcomeEmail({ user }, config.isTesting) })
                            .then(_ => res.status(200).json({ message: 'Registro exitoso' }))
                    })
            } else {
                return entities[role + 's']
                            .create(info)
                            .then(_ => res.status(200).json({ message: 'Registro exitoso' }))
            }
            
        })
        .catch(err => res.status(400).json({ error: `Hubo un error al registrarte > ${ err.message }`}))
})

module.exports = router