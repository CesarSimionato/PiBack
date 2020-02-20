const Products = require('../models/Products');

module.exports = {

  async index(req, res) {
    const { store_id } = req.body;
    try {
      const products = await Products.find({ store: store_id }).populate('store');
      res.send({ products })
    } catch (err) {
      res.status(400).send({ erro: "Error listing products" });
    }
  },

  async show(req, res) {
    const id = req.params.productId;
    try {
      const product = await Products.find({ _id: id }).populate('store');
      res.send({ product })
    } catch (err) {
      res.status(400).send({ erro: "Error listing product" });
    }
  },

  async store(req, res) {
    try {

      const {
        store,
        name,
        description,
        value,
        cookingTime,
        ingredients,
        type
      } = req.body;

      const product = await Products.create({
        store,
        name,
        description,
        value,
        cookingTime,
        ingredients: ingredients.split(',').map(ingredient => ingredient.trim()),
        type
      })

      res.send({ product })
    } catch (err) {
      res.status(400).send({ erro: "Error listing product" });
    }
  },

  async put(req, res) {
    try {
      const product = await Products.findByIdAndUpdate(req.params.productId, req.body, {
        new: true
      });
      res.send({ product });
    } catch (err) {
      res.status(400).send({ erro: "Error changing data for this product" });
    }
  },

  async delete(req, res) {
    try {
      await Products.findByIdAndRemove(req.params.productId);
      res.send();
    } catch (err) {
      res.status(400).send({ erro: "Error deleting this product" });
    }
  }

}
