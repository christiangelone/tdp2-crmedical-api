const firebaseConfig = require('./firebase_config');

/* El archivo api-key.json debe estar en el directorio 'firebase'. Este archivo no debe subirse a github, sino que debe obtenerse por otros medios (email por ejemplo) */
/* firebaseConfig es una funcion que debe invocarse antes de usar firebase para cualquier cosa */
firebaseConfig({ FIREBASE_PATH: "./api-key.json" })

const notifDispatcher = require('./notif_dispatcher');

/* Este token identifica a un dispositivo emulado de android */
const token = 'eyJM0JO6xGE:APA91bFzBmfDuRp2TAVRHV6nqhjCH7KuJ6fdv3FDZtpp_qrSPAov6boDI2vpm88EVVcTJDsk68kCJVkAr0tKPlPKXxWFipJ8UCNT9RtsK3YCFv7Uxv7VpnQnb2xYsqjYh-7qhFj99Iew'

/* Envio una notificacion a un dispositivo con el titulo 'Obi-wan says' y el mensaje 'Hello there' */
notifDispatcher.sendNotification(token, 'Obi-wan says' , 'Hello there', response => {
    console.log({ response });
}, error => {
    console.log({ error });
});
