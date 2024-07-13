
const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");

const Order = require('../models/orderModel');
const mongoose = require('mongoose');

// Initialize MailerSend
const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});

const sentFrom = new Sender("antoniomakary@trial-pr9084zymxxgw63d.mlsender.net", "Butoni");
const recipients = [
  new Recipient("antonionufc007@gmail.com", "Antonio")
];

const createOrder = async (req, res) => {
  console.log('Received data:', req.body);
  const order = new Order(req.body);
  try {
    const insertedOrder = await order.save();
    
    // Send email after order is created
    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject("New Order Created")
      .setHtml(`<strong>Order Details:</strong><br>${JSON.stringify(insertedOrder)}`)
      .setText(`Order Details:\n${JSON.stringify(insertedOrder)}`);
    
    mailerSend.email
      .send(emailParams)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    
    res.status(201).json(insertedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  createOrder
}
