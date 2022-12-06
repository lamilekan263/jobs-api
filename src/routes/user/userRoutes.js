const express = require('express');
const { createUser, login } = require('./userController');

const Router = express.Router();


Router.route('/login').post(login)
Router.route('/signup').post(createUser)


module.exports = Router