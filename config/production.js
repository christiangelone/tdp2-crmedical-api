module.exports = {
    ENV: process.env['NODE_ENV'],
    DB_URI: process.env['DATABASE_URL'],
    DB_DIALECT: 'postgres',
    PORT: process.env['PORT'],
    MIGRATIONS: {
        username: process.env['DB_USERNAME'],
        password: process.env['DB_PASSWORD'],
        database: process.env['DB_NAME'],
        host: process.env['DB_HOST'],
        dialect: "postgres"
    }
}