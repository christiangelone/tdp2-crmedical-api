module.exports = {
    ENV: process.env['NODE_ENV'],
    DB_URI: process.env['DATABASE_URL'],
    DB_DIALECT: 'postgres',
    PORT: process.env.PORT
}