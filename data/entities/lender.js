const { db, dataTypes } = require('../db')

const Lender = db.define('lenders', {
    type: {
      type: dataTypes.STRING,
      allowNull: false
    },
    name: {
      type: dataTypes.STRING,
      allowNull: false
    },
    languages: {
      type: dataTypes.STRING,
      default: 'Español'
    },
    plan: {
      type: dataTypes.STRING,
      allowNull: false
    },
    emails: {
      type: dataTypes.TEXT,
      allowNull: false
    }
}, {
    underscored: true,
    freezeTableName: true,
    classMethods: {
      associate: (entities) => {
        console.log("ASSOCIATIONS FOR LEDER LOADED!")
        Lender.hasMany(
          entities.offices,
          { foreignKey: 'lender_id', as: 'offices' }
        )
        Lender.belongsToMany(
          entities.offices,
          { through: entities.lender_specialty, foreignKey: 'specialty_id', as: 'specialties'}
        )
      }
    }
});

module.exports = Lender