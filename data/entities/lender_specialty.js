const { db, dataTypes } = require('../db')

const Lender_Speciality = db.define('lender_specialty', {
    lender_id: {
        type: dataTypes.STRING,
        allowNull: false,
        references: {
            model: 'lenders',
            key: 'id'
        }
    },
    specialty_id: {
        type: dataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'specialties',
            key: 'id'
        }
    }
}, { 
    underscored: true,
    timestamps: false,
    freezeTableName: true,
    classMethods: {
      associate: (entities) => {
        console.log("ASSOCIATIONS FOR LENDER_SPECIALITY LOADED!")
      }
    }
  });

module.exports = Lender_Speciality