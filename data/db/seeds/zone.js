const entities = require('../../entities')
module.exports = module.exports = entities.models.zones.count()
.then(c => c > 0 ? Promise.resolve() :
    entities.models.zones
    .destroy({ truncate: { cascade: false } })
    .then(() => entities.models.zones.bulkCreate([
        { name: "Agronomía" },
        { name: "Almagro" },
        { name: "Balvanera" },
        { name: "Barracas" },
        { name: "Belgrano" },
        { name: "Boedo" },
        { name: "Caballito" },
        { name: "Chacarita" },
        { name: "Coghlan" },
        { name: "Colegiales" },
        { name: "Constitución" },
        { name: "Flores" },
        { name: "Floresta" },
        { name: "La Boca" },
        { name: "La Paternal" },
        { name: "Liniers" },
        { name: "Mataderos" },
        { name: "Monte Castro" },
        { name: "Montserrat" },
        { name: "Nueva Pompeya" },
        { name: "Nuñez" },
        { name: "Palermo" },
        { name: "Parque Avellaneda" },
        { name: "Parque Chacabuco" },
        { name: "Parque Chas" },
        { name: "Parque Patricios" },
        { name: "Puerto Madero" },
        { name: "Recoleta" },
        { name: "Retiro" },
        { name: "Saavedra" },
        { name: "San Cristóbal" },
        { name: "San Nicolás" },
        { name: "San Telmo" },
        { name: "Versalles" },
        { name: "Villa Crespo" },
        { name: "Villa Devoto" },
        { name: "Villa General Mitre" },
        { name: "Villa Lugano" },
        { name: "Villa Luro" },
        { name: "Villa Ortúzar" },
        { name: "Villa Pueyrredón" },
        { name: "Villa Real" },
        { name: "Villa Riachuelo" },
        { name: "Villa Santa Rita" },
        { name: "Villa Soldati" },
        { name: "Villa Urquiza" },
        { name: "Villa del Parque" },
        { name: "Vélez Sarsfield" }
    ])))