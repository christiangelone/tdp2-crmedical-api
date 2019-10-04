'use strict';

const config = require('../../config')
const entities = require('../entities')
const seeds = require('./seeds')
const configEnv = config[process.env.NODE_ENV]
const Sequelize = require('sequelize');

const sequelize = new Sequelize(configEnv['DB_URI'], {
  dialect: configEnv['DB_DIALECT'],
  storage: configEnv['DB_STORAGE']
});

module.exports.init = () => sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .then(() => entities.initEntitiyModels(sequelize))
  .then(() => sequelize.sync({ force: false })) // TODO: Found the way to use {force: true} for tests & change the false for `config.isTesting`
  .then(() => seeds.populate())
  .then(() => console.log('Tables created & seeds loaded!'))
  .catch(err => console.error('Unable to connect to the database:', err));

module.exports.db = sequelize
module.exports.dataTypes = Sequelize.DataTypes

