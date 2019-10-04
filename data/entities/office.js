module.exports = (db, dataTypes) => {
  const Office = db.define('offices', {
    id: {
      type: dataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
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
    },
    zone_id: {
      type: dataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'zones',
          key: 'id'
      }
    },
    lender_id: {
      type: dataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'lenders',
          key: 'id'
      }
    }
}, { 
    underscored: true,
    timestamps: false,
    freezeTableName: true
  });

  Office.associate = (entities) => {
    console.log("ASSOCIATIONS FOR OFFICE LOADED!")
    Office.belongsTo(
        entities.zones,
        { foreignKey: 'zone_id', as: 'zone' }
    )
  }

  return Office
}