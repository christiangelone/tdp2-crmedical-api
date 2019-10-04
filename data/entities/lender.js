module.exports = (db, dataTypes) => {
  const Lender = db.define('lenders', {
      id: {
        type: dataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
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
      freezeTableName: true
  });

  Lender.associate = (entities) => {
    console.log("ASSOCIATIONS FOR LEDER LOADED!")
    Lender.hasMany(
      entities.offices,
      { foreignKey: 'lender_id', as: 'offices' }
    )
    Lender.belongsToMany(
      entities.specialties,
      {
        through: entities.lender_specialty,
        foreignKey: 'lender_id',
        as: 'specialties'
      }
    )
  }
  return Lender
}