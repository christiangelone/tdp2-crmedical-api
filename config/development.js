module.exports = {
    ENV: process.env['NODE_ENV'],
    DB_URI: 'postgres://postgres@db:5432/myhealthapp',
    DB_DIALECT: 'postgres',
    PORT: 3333,
    MIGRATIONS: {
        username: "postgres",
        password: null,
        database: "myhealthapp",
        host: "db",
        dialect: "postgres"
    }
}