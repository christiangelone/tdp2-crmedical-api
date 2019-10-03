module.exports.populate = () => Promise.all([
    require('./authorized_affiliates'),
    require('./specialties'),
    require('./zone')
])