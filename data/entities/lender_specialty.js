module.exports = (db, dataTypes) => {
  const Lender_Speciality = db.define('lender_specialty', {
    id: {
      type: dataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    lender_id: {
      type: dataTypes.INTEGER,
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
    freezeTableName: true
  });

  Lender_Speciality.associate = (entities) => {
    console.log("ASSOCIATIONS FOR LENDER_SPECIALITY LOADED!")
  }

  return Lender_Speciality
}