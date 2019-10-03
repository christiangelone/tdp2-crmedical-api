const configEnv = require('../../config')[process.env['NODE_ENV']]

module.exports = {
    [configEnv['ENV']]: Object.assign({}, configEnv['MIGRATIONS'])
};