require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const orderRoutes = require('./routes/orders')
const cors = require('cors');


// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})


app.use(cors({
  origin: "*",
  methods: "HEAD,PUT,PATCH,POST",
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// routes
app.use('/api/orders', orderRoutes)


// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 