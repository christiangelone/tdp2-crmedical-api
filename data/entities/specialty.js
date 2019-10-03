const { db, dataTypes } = require('../db')

const Specialty = db.define('specialties', {
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
      console.log("ASSOCIATIONS FOR SPECIALITY LOADED!")
      Specialty.belongsToMany(
        entities.lenders,
        { through: entities.lender_specialty, foreignKey: 'lender_id', as: 'lenders' }
      )
    }
  }
});

module.exports = Specialty