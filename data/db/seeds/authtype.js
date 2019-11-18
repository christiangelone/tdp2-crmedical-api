const entities = require('../../entities')
module.exports = entities.models.authtypes.count()
    .then(c => c > 0 ? Promise.resolve() :
        entities.models.authtypes
            .destroy({ truncate: { cascade: false } })
            .then(() => entities.models.authtypes.bulkCreate([
                { name: "TOMOGRAFIA" },
                { name: "RADIOGRAFIA" },
                { name: "ESCANOGRAMA" },
                { name: "ESPINOGRAMA DIGITAL" },
                { name: "RADIOLOGÍA DIGITAL CONVENCIONAL" },
                { name: "ECOGRAFÍA ARTICULACIONES" },
                { name: "ECOGRAFÍA CON TRANSLUSCENCIA NUCAL" },
                { name: "ECOGRAFÍA GENERAL" },
                { name: "ECOGRAFÍA MÚSCULO ESQUELÉTICA" },
                { name: "ECOGRAFÍA OBSTÉTRICA CON SCAN FETAL" },
                { name: "ECOGRAFÍA PARTES BLANDAS" },
                { name: "ECOGRAFÍA TRANSRECTAL DE PRÓSTATA" },
                { name: "MONITOREO DE OVULACIÓN INTRACAVITARIO" },
                { name: "MONITOREO ECOGRÁFICO DE LA OVULACIÓN" },
                { name: "ANGIOTOMOGRAFÍA COMPUTADA MULTISLICE" },
                { name: "TOMOGRAFÍA COMPUTADA MULTISLICE CON CONTRASTE" },
                { name: "TOMOGRAFÍA COMPUTADA MULTISLICE SIN CONTRASTE" },
                { name: "TOMOGRAFÍA COMPUTADA MULTISLICE CON RECONSTRUCCIÓN 3D" },
                { name: "UROGRAMA POR TOMOGRAFÍA COMPUTADA" },
                { name: "RESONANCIA MAGNÉTICA CON O SIN CONTRASTE" },
                { name: "RESONANCIA MAGNÉTICA CON PROTOCOLO DE EPILEPSIA" },
                { name: "COMPRESIÓN FOCALIZADA" },
                { name: "MAGNIFICACIÓN UNILATERAL Y BILATERAL" },
                { name: "MAMOGRAFÍA CON TÉCNICA DE EKLUND" },
                { name: "MAMOGRAFÍA DIGITAL CON PROYECCIÓN AXILAR" },
                { name: "TOMOSÍNTESIS O MAMOGRAFÍA 3D" }
            ])))