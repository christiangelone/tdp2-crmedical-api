const state = { bucket: null }

/**
 * Inicializa el modulo para administrar archivos en firebase
 * @param {any} bucket Firebase storage API inicializada
 */
function configure(bucket) {
    state.bucket = bucket;
}

/**
 * Sube un archivo a firebase desde disco
 * @param {string} filePath FilePath del archivo a subir
 * @param {string} destination Ruta destino en firebase (ej: myhealthapp/checks/pending/foo.jpg)
 * @returns {Promise} Promesa de subida de archivo
 */
function uploadFromFs(filePath, destination) {
    const options = {
        destination: destination, public: true, metadata: {
            cacheControl: 'public, max-age=31536000',
        }
    };
    const bucket = state.bucket;

    return new Promise((resolve, reject) => {
        bucket.upload(filePath, options, function (err, file) {
            if (err) { reject(err); }
            else { resolve(parseMetadata(file.metadata)); }
        });
    })
}

/**
 * Sube un archivo a partir de un stream
 * @param {ReadableStream} stream Stream de datos
 * @param {string} destination destino de archivo en firebase (ej: myhealthapp/checks/pending/foo.jpg)
 * @param {any} metadata Metadatos del archivo a subir (ej: { contentType: 'image/png' })
 * @returns {Promise} Promesa de subida de archivo
 */
function uploadFromStream(stream, destination, metadata = {}) {
    const bucket = state.bucket;
    const file = bucket.file(destination);

    return new Promise((resolve, reject) => {
        stream.pipe(file.createWriteStream({ public: true, metadata }))
            .on('error', reject)
            .on('finish', () => file.getMetadata().then(metaa => resolve(parseMetadata(metaa[0]))));
    });
}

/**
 * Parsea la metadata de un archivo en firebase para quedarse con la informacion importante
 */
function parseMetadata(metadata) {
    const { id, name, mediaLink, contentType } = metadata
    return { id, path: name, url: mediaLink, contentType }
}

function getFile(srcFile) {
    const bucket = state.bucket;
    const file = bucket.file(srcFile);
    return file;
}

module.exports = { configure, uploadFromFs, uploadFromStream, getFile }

//{ metadata: { contentType: 'image/jpeg' } }