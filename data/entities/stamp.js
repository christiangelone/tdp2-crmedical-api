module.exports = (db, dataTypes) => {
    const Stamp = db.define('stamps', {
      id: {
        type: dataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: dataTypes.STRING,
        allowNull: false
      },
      url: {
        type: dataTypes.TEXT,
        allowNull: false
      }
    }, {
      underscored: true,
      timestamps: false,
      freezeTableName: true,
    });
  
    return Stamp
}