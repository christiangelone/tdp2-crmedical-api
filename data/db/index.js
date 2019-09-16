const config = require('../../config')
const configEnv = config[process.env.NODE_ENV]
const Sequelize = require('sequelize');

const sequelize = new Sequelize(configEnv['DB_URI'], {
  dialect: configEnv['DB_DIALECT'],
  storage: configEnv['DB_STORAGE']
});

module.exports.init = () => {
  sequelize
    .authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .then(() => sequelize.sync({ force: config.isTesting }))
    .then(() => console.log('Tables created!'))
    .catch(err => console.error('Unable to connect to the database:', err));
}

module.exports.db = sequelize
module.exports.dataTypes = Sequelize.DataTypes

