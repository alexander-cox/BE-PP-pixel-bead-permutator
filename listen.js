if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'production') process.env.NODE_ENV = 'dev';

const app = require('./app');
const { PORT=3000 } = process.env;

app.listen(PORT, (err) => {
    if(err) return console.log(err);
    console.log(`App listening on port ${PORT}`);
})