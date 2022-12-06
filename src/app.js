require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rateLimiter = require('express-rate-limit');
const xss = require('xss-clean');
const helmet = require('helmet');


const api = require('./routes/api');



const app = express();

app.set('trust proxy', 1);

app.use(rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
}));
app.use(xss());
app.use(helmet());

// middlewares
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());

// routes

app.get('/', (req, res) => {
    res.send('jobs-api');
});

app.use('/api/v1', api);


app.use('*', (req, res) => {
    res.status(404).json({
        status: 'failed',
        message: 'Not found'
    });
});
module.exports = app;