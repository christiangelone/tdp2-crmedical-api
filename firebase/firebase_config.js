
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

        // se configura el manejador de notificaciones push
        const notifDispatcher = require('./notif_dispatcher');
        notifDispatcher.configure(fbAdmin.messaging());

        // se configura el manejador de buckets de firebase
        //const bucketManager = require('./bucket_manager');
        //bucketManager.configure(fbAdmin.storage().bucket());
    }
}
