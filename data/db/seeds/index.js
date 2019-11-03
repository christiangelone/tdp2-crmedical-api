module.exports.populate = () => Promise.all([
    require('./authtype'),
    require('./authorized_affiliates'),
    require('./specialties'),
    require('./zone')
])