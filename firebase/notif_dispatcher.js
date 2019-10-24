const state = { messaging: null }

/**
 * Inicializa el modulo para enviar notificaciones push
 * @param {any} messaging Firebase Messaging API inicializada
 */
function configure(messaging) {
    state.messaging = messaging;
}

/**
 * Envia una 'push notification' a un dispositivo cliente
 * @param {string} token Token que identifica al dispositivo
 * @param {string} title Titulo de la notificacion
 * @param {string} payload Contenido del mensaje
 * @param {function} succCallback Callback a ejecutar ante un exito. La respuesta del api tiene la siguiente estructura:
 *  {"response":"projects/lustrous-bay-252022/messages/0:1571880395219718%e7d51fb0f9fd7ecd"}
 * @param {function} errCallback Callback a ejecutar ante un error
 */
function sendNotification(token, title, payload, succCallback, errCallback) {
    const message = {
        data: { title, message: payload }, token
    };

    state.messaging.send(message).then(succCallback).catch(errCallback);
}

module.exports = {
    configure, sendNotification
}
