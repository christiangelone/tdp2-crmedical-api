const { db, dataTypes } = require('../db')

const Affiliate = db.define('affiliates', {
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
  plan: {
    type: dataTypes.STRING,
    allowNull: false
  },
  idn: {
    type: dataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  email: {
    type: dataTypes.STRING,
    allowNull: false
  },
  hashed_password: {
    type: dataTypes.STRING,
    allowNull: false
  }
}, {
  underscored: true,
  freezeTableName: true,
  classMethods: {
    associate: (entities) => {
      console.log("ASSOCIATIONS FOR AFFILIATE LOADED!")
    }
  }
});

module.exports = Affiliate