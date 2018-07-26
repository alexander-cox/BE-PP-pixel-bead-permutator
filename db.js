const pgp = require('pg-promise')({promiseLib: Promise});
if (process.env.NODE_ENV === 'production') {
    console.log(`connected to ${process.env.NODE_ENV} db`);
    module.exports = pgp(process.env.DATABASE_URL);
} else {
    const config = require(`./config/${process.env.NODE_ENV}.config.js`);
    console.log(`connected to ${process.env.NODE_ENV} db`);
    module.exports = pgp(config.connection);
}


