const Pool = require('pg').Pool;

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    port: 5432,
    database: 'jwtauth'
});

module.exports = pool;