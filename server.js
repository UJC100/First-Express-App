require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const corsOptions = require("./config/corsOptions")
const connectDB = require("./config/dbConn")
const userRoutes = require("./routes/userRoutes")
const authRoutes = require("./routes/AuthRoutes")
const refreshTokenRoute = require("./routes/refreshTokenRoute");

const PORT = process.env.PORT || 5000




//connect DB
connectDB()

app.use(cors(corsOptions));

app.use(express.urlencoded({extended: false}))
app.use(express.json())



app.use('/api/users', userRoutes)
app.use("/api/users", authRoutes);
app.use("api/users", refreshTokenRoute);

mongoose.connection.once('open', () => {
    console.log('connected to mongoDB')
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
});