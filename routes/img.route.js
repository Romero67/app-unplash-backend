const express = require('express');
const routes = express.Router();

const {verifyToken} = require('../middlewares/authJwt');
const { imgById, list, create, remove } = require('../controllers/img.controller');

routes.get('/imgs', list);
routes.post('/create', create);
routes.delete('/remove/:imgId',verifyToken, remove);

routes.param('imgId', imgById);

module.exports = routes;