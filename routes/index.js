const auth = require('./auth')
const specialties = require('./specialties')
const zones = require('./zones')
const lenders = require('./lenders')
const authorizations = require('./authorizations')
const authtypes = require('./authtypes')

module.exports = api => {

    api.get('/health', (req, res) => res.status(200).end())
    api.use('/auth', auth)
    api.use('/specialties', specialties)
    api.use('/zones', zones)
    api.use('/lenders', lenders)
    api.use('/authorizations', authorizations)
    api.use('/authtypes', authtypes)
    return api
}