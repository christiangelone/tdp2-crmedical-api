const auth = require('./auth')

module.exports = api => {

    api.use('/auth', auth)
    return api
}