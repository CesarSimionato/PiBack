const Clients = require('../models/Clients');
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
      const client = await Clients.findOne({ email }).select('+password');

      if (!client)
        return res.status(400).send({ erro: "Client not found" });

      if (!await bcrypt.compare(password, client.password))
        return res.status(400).send({ erro: "Invalid password" });

      client.password = undefined;

      res.send({
        client,
        token: generateToken({ id: client.id })
      });
    } catch (err) {

    }
  },

  async store(req, res) {

    const { email } = req.body;

    try {

      if (await Clients.findOne({ email }))
        return res.status(400).send({ erro: "Email already exists in system" })

      const {
        name,
        password,
        ra,
      } = req.body;

      const client = await Clients.create({
        name,
        email,
        password,
        ra,
      });

      client.password = undefined;

      res.json({
        client,
        token: generateToken({ id: client.id })
      });
    } catch (err) {
      res.status(400).send({ erro: "Error registering this client" });
    }
  },

  async put(req, res) {
    try {
      const client = await Clients.findByIdAndUpdate(req.params.clientId, req.body, {
        new: true
      });

      res.send({ client });
    } catch (err) {
      res.status(400).send({ erro: "Error changing data for this client" });
    }
  },

  async delete(req, res) {
    try {
      await Clients.findByIdAndRemove(req.params.clientId);
      res.send();
    } catch (err) {
      res.status(400).send({ erro: "Error deleting this client" });
    }
  }
}