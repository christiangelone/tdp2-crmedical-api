const firebaseConfig = require('./firebase_config');

/* El archivo api-key.json debe estar en el directorio 'firebase'. Este archivo no debe subirse a github, sino que debe obtenerse por otros medios (email por ejemplo) */
/* firebaseConfig es una funcion que debe invocarse antes de usar firebase para cualquier cosa */
firebaseConfig({ FIREBASE_PATH: "./api-key.json" })

const bucketManager = require('./bucket_manager');


const destination = 'myhealthapp/checks/pending/carlos.jpg'

const file = bucketManager.getFile(destination)


file.getMetadata().then(metadata => {
    console.log({url: metadata[0].mediaLink})
});



