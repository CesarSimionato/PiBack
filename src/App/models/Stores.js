const mongoose = require('../../database');

const bcryptjs = require('bcryptjs');

const StoresSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  admin: {
    type: String,
    required: true
  },
  createAt:{
    type: Date,
    default: Date.now
  }}
);

// Transformar a senha em um hash
StoresSchema.pre('save', async function (next) {
  const hash = await bcryptjs.hash(this.password, 10);
  this.password = hash;
  next();
});

const Stores = mongoose.model("Stores", StoresSchema);

module.exports = Stores;