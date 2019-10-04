const entities = require('../../entities')
module.exports = entities.models.authorized_affiliates.count()
.then(c => c > 0 ? Promise.resolve() :
  entities.models.authorized_affiliates
  .destroy({ truncate: { cascade: false } })
  .then(() => entities.models.authorized_affiliates.bulkCreate([
      {
        firstname: 'Christian',
        lastname: 'Angelone',
        birthdate: '1990-08-31',
        affiliate_id: '1234567890',
        plan: 'A210',
        idn: 35317588,
        expires: "2020-09-17"
      },
      {
        firstname: 'Martin',
        lastname: 'Garcia',
        birthdate: '1990-07-21',
        affiliate_id: '0987654321',
        plan: 'A310',
        idn: 34317677,
        expires: "2020-09-17"
      },
      {
        firstname: "Martin",
        lastname: "Zaragoza",
        birthdate: "1991-03-21",
        affiliate_id: "35657201",
        idn: 35657201,
        plan: "A110",
        expires: "2020-09-17"
      },
      {
        firstname: "Nadia",
        lastname: "Galli",
        birthdate: "1990-11-23",
        affiliate_id: "35532493",
        idn: 35532493,
        plan:"A210",
        expires: "2020-10-18"
      },
      {
        firstname: "Hector",
        lastname: "Zaragoza",
        birthdate: "1960-09-18",
        affiliate_id: "14062534",
        idn: 14062534,
        plan:"A310",
        expires: "2020-11-19"
      },
      {
        firstname: "Pepe",
        lastname: "Argento",
        birthdate: "1960-08-17",
        affiliate_id: "12345678",
        idn: 12345678,
        plan:"A110",
        expires:"2019-07-01"
      }
  ])))