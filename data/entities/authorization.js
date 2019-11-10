module.exports = (db, dataTypes) => {
    const Authorization = db.define('authorizations', {
      id: {
        type: dataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      url: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      path: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: dataTypes.STRING,
        allowNull: false,
        default: 'PENDING'
      },
      observations: {
        type: dataTypes.TEXT
      },
      specialty_id: {
        type: dataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'specialties',
          key: 'id'
        }
      },
      affiliate_id: {
        type: dataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'affiliates',
          key: 'id'
        }
      },
      authtype_id: {
        type: dataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'authtypes',
          key: 'id'
        }
      }
    }, {
      underscored: true,
      timestamps: true,
      freezeTableName: true
    });
  
    Authorization.associate = (entities) => {
        console.log("ASSOCIATIONS FOR Authorization LOADED!")
        Authorization.belongsTo(
            entities.affiliates,
            { foreignKey: 'affiliate_id', as: 'affiliate' }
        )
        Authorization.belongsTo(
            entities.specialties,
            { foreignKey: 'specialty_id', as: 'specialty' }
        )
        Authorization.belongsTo(
            entities.authtypes,
            { foreignKey: 'authtype_id', as: 'authtype' }
        )
    }
  
    return Authorization
}