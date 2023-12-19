const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware');
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()

// init express app
const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/assignments', require('./routes/assignmentRoutes'))

// overwrite default express error handler
app.use(errorHandler);

// listen for the port, when it starts do the call back
app.listen(port, () => {
    console.log(`server started on ${port}`)
})