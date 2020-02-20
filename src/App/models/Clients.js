const mongoose = require('../../database');

const bcryptjs = require('bcryptjs');

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  ra: {
    type: String,
    required: true,
    unique: true
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});

// Transformar a senha em um hash
ClientSchema.pre('save', async function (next) {
  const hash = await bcryptjs.hash(this.password, 10);
  this.password = hash;
  next();
});

const Clients = mongoose.model("Clients", ClientSchema);

module.exports = Clients;