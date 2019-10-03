const auth = require('./auth')
const specialties = require('./specialties')
const zones = require('./zones')

module.exports = api => {

    api.get('/health', (req, res) => res.status(200).end())
    api.use('/auth', auth)
    api.use('/specialties', specialties)
    api.use('/zones', zones)
    return api
}