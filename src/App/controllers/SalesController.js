const Sales = require('../models/Sales');

module.exports = {

  async index(req, res) {
    try {

      const { whoOrders } = req.body;

      let sales;

      if(whoOrders === 'client'); {
        try {
          const { client_id } = req.body;
          sales = await Sales.find({ client: client_id }).populate('client').populate('store');
        } catch (err) {
          res.status(400).send({ erro: "Error listing sales for a client" });
        }
      }

      if(whoOrders === 'store'); {
        try {
          const { store_id } = req.body;
          sales = await Sales.find({ store: store_id }).populate('client').populate('store');
        } catch (err) {
          res.status(400).send({ erro: "Error listing sales for a store" });
        }
      }

      res.send({ sales });

    } catch (err) {
      res.status(400).send({ erro: "Error listing sales, who orders has not been defined" });
    }
  },

  async show(req, res) {
    try {
      const sale = await Sales.findById(req.params.saleId).populate('client').populate('store');

      res.send({ sale });
    } catch{
      res.status(400).send({ erro: "Error previewing this sale" });
    }
  },

  async store(req, res) {
    try {

      const {
        client,
        store,
        products,
        value,
        wayPayment
      } = req.body;

      const sale = await Sales.create({
        client,
        store,
        products,
        value,
        wayPayment
      });

      res.send({ sale });
    } catch (err) {
      res.status(400).send({ erro: "Error registering this sale" });
    }
  },

}

