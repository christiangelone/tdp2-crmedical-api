module.exports = (db, dataTypes) => {
  const Specialty = db.define('specialties', {
    id: {
      type: dataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: dataTypes.STRING,
      allowNull: false
    }
  }, {
    underscored: true,
    timestamps: false,
    freezeTableName: true,
  });

  Specialty.associate = (entities) => {
    console.log("ASSOCIATIONS FOR SPECIALITY LOADED!")
    Specialty.belongsToMany(
      entities.lenders,
      { 
        through: entities.lender_specialty,
        foreignKey: 'specialty_id',
        as: 'lenders'
      }
    )
  }

  return Specialty
}