const mongoose = require('../../database');

const ProductsSchema = new mongoose.Schema({
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stores',
    require: true
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  value: {
    type: Number,
    required: true
  },
  qty: Number,
  cookingTime: String,
  ingredients: [String],
  type: {
    type: String,
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});

const Products = mongoose.model("Products", ProductsSchema);

module.exports = Products;