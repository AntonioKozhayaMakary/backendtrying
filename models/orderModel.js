const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  order: {
    type: Array,
    required: true,
    unique: true // Ensures that the order is unique
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
