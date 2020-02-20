const express = require('express');
const authMiddleware = require('../middlewares/auth');

const ProductsController = require('../controllers/ProductsController');

const routes = express.Router();

routes.use(authMiddleware);

routes.post('/list', ProductsController.index);
routes.get('/:productId', ProductsController.show);
routes.post('/', ProductsController.store);
routes.put('/:productId', ProductsController.put);
routes.delete('/:productId', ProductsController.delete);

module.exports = app => app.use('/products', routes);