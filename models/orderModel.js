const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  order: {
    type: Array,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
