const express = require('express');
const authMiddleware = require('../middlewares/auth');

const SalesController = require('../controllers/SalesController');

const routes = express.Router();

routes.use(authMiddleware);

routes.post('/list', SalesController.index);
routes.get('/:saleId', SalesController.show);
routes.post('/', SalesController.store);

// Apagar depois
routes.delete('/:saleId', SalesController.delete);

module.exports = app => app.use('/sales', routes);