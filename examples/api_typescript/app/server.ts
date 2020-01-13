// lib/app.ts
import express from 'express';
import config = require('./config/express');

// Create a new express application instance
const app: express.Application = express();

config.applyConfig(app);

app.get('/', function (req, res) {
    res.send('Hello World Evry! ');
});

app.listen(3030, function () {
    console.log('Example app listening on port 3030!');
});