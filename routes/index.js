const auth = require('./auth')

module.exports = api => {

    api.get('/health', (req, res) => res.status(200).end())
    api.use('/auth', auth)
    return api
}