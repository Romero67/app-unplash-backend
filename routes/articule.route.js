const express = require("express");
const routes = express.Router();

const { create, list, photo, articuleById, remove } = require('../controllers/articule.controller');

routes.post('/create', create);
routes.get('/articules', list);
routes.get('/photo/:articuleId', photo);
routes.delete('/remove/:articuleId', remove);

routes.param('articuleId', articuleById)

module.exports = routes;