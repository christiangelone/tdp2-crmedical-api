const { Pool, Client } = require('pg')

var connectionString = "postgres://postgres:@localhost:5432/myhealthapp";

// create a pool
// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'myhealthapp',
//     password: '',
//     port: 5432,
// })

const pool = new Pool({ connectionString: connectionString })

const query = `
select sub.okdate, count(sub.okdate) 
  from (select id,date_trunc('day',updated_at) as okdate 
    from authorizations 
    where (status='AUTORIZADO' or status='AUTORIZADO AUTOMATICAMENTE') 
    and updated_at > now() - interval '30 days') 
  as sub 
  group by sub.okdate 
  order by sub.okdate asc;
`

new Promise((resolve, reject) => {
    pool.query(query, (err, res) => {
        if (err) reject(err)
        else resolve(res.rows)
    })
}).then(rows => {
    console.log({ rows })
}).catch(err => {
    console.error({ err })
}).finally(() => pool.end())

const client = new Client({
    connectionString: connectionString,
});


client.connect().then(() => {
    client.query('SELECT NOW()', (err, resultset) => {
        throw  new Error("Un error loco");
        // console.log(err, resultset.rows)
        // client.end()
    })
}).catch(err => {
    console.log("CAPTURADO")
    console.log(err.message)
})
