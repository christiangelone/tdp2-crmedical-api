module.exports = (db, dataTypes) => {
  const Affiliate = db.define('affiliates', {
    id: {
      type: dataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    firstname: {
      type: dataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: dataTypes.STRING,
      allowNull: false
    },
    birthdate: {
      type: dataTypes.DATEONLY,
      allowNull: false
    },
    affiliate_id: {
      type: dataTypes.STRING,
      allowNull: false
    },
    plan: {
      type: dataTypes.STRING,
      allowNull: false
    },
    idn: {
      type: dataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    email: {
      type: dataTypes.STRING,
      allowNull: false
    },
    hashed_password: {
      type: dataTypes.STRING,
      allowNull: false
    },
    device_token: {
      type: dataTypes.TEXT
    }
  }, {
    underscored: true,
    freezeTableName: true
  });

  Affiliate.associate = (entities) => {
    console.log("ASSOCIATIONS FOR AFFILIATE LOADED!")
  }

  return Affiliate
}