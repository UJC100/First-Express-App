require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const connectDB = require("./config/dbConn")

const PORT = process.env.PORT || 5000




//connect DB
connectDB()

app.get('/', (req, res) => {
    res.send('')
})

mongoose.connection.once('open', () => {
    console.log('connected to mongoDB')
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
});