const firebaseConfig = require('./firebase_config');

/* El archivo api-key.json debe estar en el directorio 'firebase'. Este archivo no debe subirse a github, sino que debe obtenerse por otros medios (email por ejemplo) */
/* firebaseConfig es una funcion que debe invocarse antes de usar firebase para cualquier cosa */
firebaseConfig({ FIREBASE_PATH: "./api-key.json" })

const bucketManager = require('./bucket_manager');

const filePath = 'C:\\Users\\martin\\workspaces\\tdp2-crmedical-api\\firebase\\md_logo.png';
const destination = 'myhealthapp/checks/pending/md_logo.png';

/* Prueba de subida mediante archivo en disco ----------------------------------------------------------------- */
// console.log('UPLOADING FILE...');
// bucketManager.uploadFromFs(filePath, destination)
//     .then(file => console.log({ file }))
//     .catch(error => console.error({ error }));

/* Prueba de subida mediante streams -------------------------------------------------------------------------- */
const fs = require('fs');
const stream = fs.createReadStream(filePath);
bucketManager.uploadFromStream(stream, destination, { contentType: 'image/png' } )
    .then(value => console.log({ value }))
    .catch(reason => console.error({ reason }));
