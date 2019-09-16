const { db, dataTypes } = require('../db')

const Affiliate = db.define('affiliate', {
  firstname: {
    type: dataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: dataTypes.STRING,
    allowNull: false
  },
  birthdate: {
    type: dataTypes.DATEONLY,
    allowNull: false
  },
  affiliate_id: {
    type: dataTypes.STRING,
    allowNull: false
  },
  idn: {
    type: dataTypes.INTEGER,
    allowNull: false
  },
  email: {
    type: dataTypes.STRING,
    allowNull: false
  },
  hashed_password: {
    type: dataTypes.STRING,
    allowNull: false
  }
}, { db });

module.exports = Affiliate