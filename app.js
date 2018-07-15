const express = require('express');
const app = express();
const apiRouter = require('./routes/api.routes');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use('/api', apiRouter);
app.get('/', (req, res) => {
    return res.status(200).send('You made it!!');
})

module.exports = app;