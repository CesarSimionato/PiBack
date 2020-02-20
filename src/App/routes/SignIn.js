const express = require('express');

const ClientsController = require('../controllers/ClientsController');
const StoresController = require('../controllers/StoresController');

const routes = express.Router();

routes.post('/clients', ClientsController.auth);
routes.post('/stores', StoresController.auth);

module.exports = app => app.use('/signin', routes);