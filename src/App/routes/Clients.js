const express = require('express');
const authMiddleware = require('../middlewares/auth');

const ClientsController = require('../controllers/ClientsController');

const routes = express.Router();

routes.use(authMiddleware);

routes.put('/:clientId', ClientsController.put);
routes.delete('/:clientId', ClientsController.delete);

module.exports = app => app.use('/clients', routes);