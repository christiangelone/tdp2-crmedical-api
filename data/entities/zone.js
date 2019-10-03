const { db, dataTypes } = require('../db')

const Zone = db.define('zones', {
  name: {
    type: dataTypes.STRING,
    allowNull: false
  }
}, {
  underscored: true,
  timestamps: false,
  freezeTableName: true,
  classMethods: {
    associate: (entities) => { 
      console.log("ASSOCIATIONS FOR ZONE LOADED!")
    }
  }
});

module.exports = Zone