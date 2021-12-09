const express = require('express');
const controller = require('./controllers/ApiController')

routes = express.Router();

//Setando a rota da API
routes.get('/getSummoner/:username', controller.getSummoner);

module.exports = routes;