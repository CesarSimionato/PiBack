const express = require('express');
const authMiddleware = require('../middlewares/auth');

const StoresController = require('../controllers/StoresController');

const routes = express.Router();

routes.use(authMiddleware);

routes.put('/:storeId', StoresController.put);
routes.delete('/:storeId', StoresController.delete);

module.exports = app => app.use('/Stores', routes);