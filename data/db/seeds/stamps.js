const entities = require('../../entities')
module.exports = entities.models.stamps.count()
    .then(c => c > 0 ? Promise.resolve() :
        entities.models.stamps
            .destroy({ truncate: { cascade: false } })
            .then(() => entities.models.stamps.bulkCreate([
                { name: "AUTORIZADO", url: 'http://www.ices-edu.com/international-company-for-consulting-and-educational-systems/images/content/about-us/authorized_seal.png'},
                { name: "RECHAZADO", url: 'https://cdn140.picsart.com/238138044090212.png?r1024x1024' }
            ])))