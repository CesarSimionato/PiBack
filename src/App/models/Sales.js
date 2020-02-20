const mongoose = require('../../database');

const SalesSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clients',
    require: true
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stores',
    require: true
  },
  products: {
    type: [Object],
    require: true
  },
  value: {
    type: Number,
    required: true
  },
  wayPayment: {
    type: String,
    required: true
  },
  createAt:{
    type: Date,
    default: Date.now
  }
});

const Sales = mongoose.model("Sales", SalesSchema);

module.exports = Sales;