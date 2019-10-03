module.exports = {
    ENV: process.env['NODE_ENV'],
    DB_URI: 'postgres://postgres@db:5432/myhealthapptest',
    DB_DIALECT: 'postgres',
    PORT: 3334,
    MIGRATIONS: {
        username: "postgres",
        password: null,
        database: "myhealthapptest",
        host: "db",
        dialect: "postgres"
    }
}