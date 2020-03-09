const mongoose = require('../../database');
const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const promisify = require('util');

const s3 = new aws.S3();

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

  // Image
  imageName: String,
  imageSize: Number,
  imageKey: String,
  imageUrl: String,

  createAt: {
    type: Date,
    default: Date.now
  }
});

ProductsSchema.pre('save', function () {
  if (!this.imageUrl) {
    this.imageUrl = `${process.env.APP_URL}/files/${this.imageKey}`;
  }
});

ProductsSchema.pre('remove', function () {
  if (process.env.STORAGE_TYPE === 's3') {
    return s3.deleteObject({
      Bucket: 'upload',
      Key: this.imageKey
    }).promise()
  } else {
    return fs.unlink(path.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', this.imageKey))
  }
})


const Products = mongoose.model("Products", ProductsSchema);

module.exports = Products;