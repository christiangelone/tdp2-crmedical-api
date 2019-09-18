const config = require('../../config')
const configEnv = config[process.env.NODE_ENV]
const Sequelize = require('sequelize');

const sequelize = new Sequelize(configEnv['DB_URI'], {
  dialect: configEnv['DB_DIALECT'],
  storage: configEnv['DB_STORAGE']
});

const populateAuthorizedAffiliates = () => {
  return require('../entities').authorized_affiliate
    .destroy({ truncate: { cascade: false } })
    .then(() => {
      require('../entities').authorized_affiliate.bulkCreate([
        {
          firstname: 'Christian',
          lastname: 'Angelone',
          birthdate: '1990-08-31',
          affiliate_id: '1234567890',
          plan: 'A210',
          idn: 35317588
        },
        {
          firstname: 'Martin',
          lastname: 'Garcia',
          birthdate: '1990-07-21',
          affiliate_id: '0987654321',
          plan: 'A310',
          idn: 34317677
        }
      ])
    })
}

module.exports.init = () => {
  sequelize
    .authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .then(() => sequelize.sync({ force: config.isTesting }))
    .then(() => populateAuthorizedAffiliates())
    .then(() => console.log('Tables created!'))
    .catch(err => console.error('Unable to connect to the database:', err));
}

module.exports.db = sequelize
module.exports.dataTypes = Sequelize.DataTypes

