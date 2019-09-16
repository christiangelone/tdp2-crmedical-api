module.exports = {
    production: require('./production'),
    development: require('./development'),
    testing: require('./testing'),
    isTesting: process.env.NODE_ENV === 'testing'
}