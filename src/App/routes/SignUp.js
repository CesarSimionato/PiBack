const express = require('express');

const ClientsController = require('../controllers/ClientsController');
const StoresController = require('../controllers/StoresController');

const routes = express.Router();

routes.post('/clients', ClientsController.store);
routes.post('/stores', StoresController.store);

module.exports = app => app.use('/signup', routes);