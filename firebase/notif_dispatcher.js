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
 * @returns {any} Promise<Object> Promesa con Id de la notificacion enviada
 */
function sendNotification(token, title, payload) {
    const message = {
        data: { title, message: payload }, token
    };

    return state.messaging.send(message);
}

module.exports = {
    configure, sendNotification
}
