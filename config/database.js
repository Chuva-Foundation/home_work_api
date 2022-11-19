const { Pool } = require('pg');
require('dotenv').config()

console.log(process.env.USER_DB, process.env.PASSWORD,  process.env.HOST,  process.env.PORT,process.env.DATABASE);
const connectDB = new Pool({
    user: process.env.USER_DB,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE
});

module.exports = connectDB;