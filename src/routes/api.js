const api = require('express').Router();
const userRoute = require('./user/userRoutes');
const jobRoute = require('./job/jobRoutes');
const authMiddleware = require('../middlewares/auth');

api.use('/auth', userRoute);

api.use('/job', authMiddleware, jobRoute);

module.exports = api;



