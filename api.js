const config = require('./config')
const configEnv = config[process.env.NODE_ENV]
console.log(`API running in ${configEnv['ENV']} environment.`)

const cors = require('cors')
const fileUpload = require('express-fileupload');

const dbData = require('./data/db')
dbData.init()

const bodyParser = require('body-parser')
const express = require('express');
const api = express();

api.use(cors())
api.use(fileUpload());
api.use(bodyParser.json())
require('./routes')(api)

const firebaseConfig = require('./firebase/firebase_config');
firebaseConfig(configEnv);

port = configEnv["PORT"] || 3333
api.listen(port, () => console.log(`ATM api listening at port ${port}...`));

module.exports.api = api
module.exports.dbData = dbData