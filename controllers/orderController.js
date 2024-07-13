const Order = require('../models/orderModel');
const mongoose = require('mongoose');


// create a new Order
export const createOrder = async (req, res) => {
  const order = new Order(req.body);
  try {
    const insertedorder = await order.save();
    res.status(201).json(insertedorder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}


module.exports = {
 createOrder
}