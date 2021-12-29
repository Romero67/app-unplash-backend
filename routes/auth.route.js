const express = require('express');
const routes = express.Router();

const {signin, signup, signout} = require('../controllers/auth.controller');

routes.post('/signup', signup);
routes.post('/signin', signin);
routes.post('/signout', signout);

module.exports = routes;