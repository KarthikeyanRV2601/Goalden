const { Pool } = require('pg');
require("dotenv").config();

const devConfig = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PGHOST,
    databse: process.env.PGDATABASE,
    port: process.env.PGPORT
}

const proConfig = {
    connectionString: process.env.DATABSE_URL
}

const pool = new Pool(process.env.NODE_ENV === "production" ? proConfig : devConfig)

module.exports = {
    query: (text, params) => pool.query(text, params),
}