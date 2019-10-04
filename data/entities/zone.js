module.exports = (db, dataTypes) => {
  const Zone = db.define('zones', {
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
    freezeTableName: true
  });

  Zone.associate = (entities) => { 
    console.log("ASSOCIATIONS FOR ZONE LOADED!")
  }
  return Zone;
}