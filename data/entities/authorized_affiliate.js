module.exports = (db, dataTypes) => {
    const AuthorizedAffiliate = db.define('authorized_affiliates', {
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
        expires: {
            type: dataTypes.DATE,
            allowNull: false,
        }
    },{
        underscored: true,
        freezeTableName: true
    });

    AuthorizedAffiliate.associate = (entities) => {
        console.log("ASSOCIATIONS FOR AUTHORIZED AFFILIATE LOADED!")
    }
    return AuthorizedAffiliate
}