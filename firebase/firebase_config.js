
module.exports = function (configEnv) {
    /* El entorno de configuracion debe tener una variable 'FIREBASE_PATH' que indique el path del archivo de configuracion de las credenciales de firebase.
    Ejemplo: FIREBASE_PATH: "./config/api-key.json" */
    if (configEnv['FIREBASE_PATH']) {
        const fbAdmin = require("firebase-admin");
        const fbServiceAccount = require(configEnv['FIREBASE_PATH']);
        fbAdmin.initializeApp({
            credential: fbAdmin.credential.cert(fbServiceAccount),
            storageBucket: "lustrous-bay-252022.appspot.com"
        });
        const notifDispatcher = require('./notif_dispatcher');
        notifDispatcher.configure(fbAdmin.messaging());
    }
}
