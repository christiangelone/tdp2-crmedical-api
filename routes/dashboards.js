const express = require('express');
const router = express.Router();
const config = require('../config')
const configEnv = config[process.env.NODE_ENV]
const { Client } = require('pg')


const db_uri = configEnv['DB_URI']

function runQuery(query, res) {
    const client = new Client({ connectionString: db_uri })

    function handleError(err) {
        res.status(500).json({ error: `Ocurrio un error al obtener conteo de autorizaciones > ${err.message}` })
    }

    client.connect().then(() => {
        client.query(query, (err, resultset) => {
            if (err) handleError(err)
            else res.json(resultset.rows)
            client.end()
        })
    }).catch(handleError)
}

router.get('/auth/authorized', (_, res) => {
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

    runQuery(query, res);
})


router.get('/auth/rejected', (_, res) => {
    const query = `
    select sub.okdate, count(sub.okdate) 
      from (select id,date_trunc('day',updated_at) as okdate 
        from authorizations 
        where status='RECHAZADO' 
        and updated_at > now() - interval '30 days') 
      as sub 
      group by sub.okdate 
      order by sub.okdate asc;
    `

    runQuery(query, res);
})

module.exports = router
