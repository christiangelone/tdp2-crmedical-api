const { db, dataTypes } = require('../db')

const Office = db.define('offices', {
    address: {
      type: dataTypes.STRING,
      allowNull: false
    },
    phone: {
        type: dataTypes.STRING,
        default: ''
    },
    lat: {
        type: dataTypes.STRING,
        allowNull: false
    },
    lon: {
        type: dataTypes.FLOAT,
        allowNull: false
    }
}, { 
    underscored: true,
    timestamps: false,
    freezeTableName: true,
    classMethods: {
      associate: (entities) => {
        console.log("ASSOCIATIONS FOR OFFICE LOADED!")
        Office.belongsTo(
            entities.zones,
            { foreignKey: 'zone_id', as: 'zone' }
        )
      }
    }
  });

module.exports = Office