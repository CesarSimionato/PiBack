const Stores = require('../models/Stores');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const authConfig = require('../../config/auth')

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 7200,
  });
}

module.exports = {

  async auth(req, res) {
    const { email, password } = req.body;
    try {
      const store = await Stores.findOne({ email }).select('+password');

      if (!store)
        return res.status(400).send({ erro: "Store not found" });

      if (!await bcrypt.compare(password, store.password))
        return res.status(400).send({ erro: "Invalid password" });

      store.password = undefined;

      res.send({
        store,
        token: generateToken({ id: store.id })
      });
    } catch (err) {
      res.status(400).send({ erro: "Error authenticating this store" });
    }
  },

  async store(req, res) {

    const { email } = req.body;

    try {

      if (await Stores.findOne({ email }))
        return res.status(400).send({ erro: "Email already exists in system" })

      const { 
        name, 
        password, 
        admin, 
      } = req.body;

      const store = await Stores.create({
        name,
        email,
        password,
        admin,
      });

      store.password = undefined;

      res.json({
        store,
        token: generateToken({ id: store.id })
      });
    } catch (err) {
      res.status(400).send({ erro: "Error registering this store" });
    }
  },

  async put(req, res) {
    try {
      const store = await Stores.findByIdAndUpdate(req.params.storeId, req.body, {
        new: true
      });

      res.send({ store });
    } catch (err) {
      res.status(400).send({ erro: "Error changing data for this store" });
    }
  },

  async delete(req, res) {
    try {
      await Stores.findByIdAndRemove(req.params.storeId);
      res.send();
    } catch (err) {
      res.status(400).send({ erro: "Error deleting this store" });
    }
  }
}