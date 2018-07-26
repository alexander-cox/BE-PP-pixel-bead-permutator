const pgp = require('pg-promise')({promiseLib: Promise});
const config = require(`./config/${process.env.NODE_ENV}.config.js`);
console.log(`connected to ${process.env.NODE_ENV} db`);

module.exports = pgp(process.env.DATABASE_URL || config.connection);