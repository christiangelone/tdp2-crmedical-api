// Modelo de TIPO de autorizacion / estudio medico (ej: radiografia, espectrometria, etc)
module.exports = (db, dataTypes) => {
  const Authtype = db.define('authtypes', {
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

  Authtype.associate = (entities) => { 
    console.log("ASSOCIATIONS FOR Authtype LOADED!")
  }
  return Authtype;
}