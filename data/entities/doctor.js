const { db, dataTypes } = require('../db')

const Doctor = db.define('doctor', {
    firstname: {
      type: dataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: dataTypes.STRING,
      allowNull: false
    },
    specialty: {
        type: dataTypes.STRING,
        allowNull: false
    },  
}, { db });

module.exports = Doctor