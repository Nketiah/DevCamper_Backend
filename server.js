const express = require('express')
const path = require('path');
const dotenv  = require('dotenv').config()
const fileupload = require('express-fileupload')
const PORT    = process.env.PORT || 5000
const logger  = require('./middleware/logger')
const morgan  = require('morgan')
const cookieParser = require('cookie-parser')
const colors = require('colors');
const connectDB = require("./config/db")
const {errorHandler} = require("./middleware/errorMiddleware")
const bootcampsRoutes = require('./routes/bootcampsRoutes')
const coursesRoutes = require("./routes/courseRoutes")
const authRoutes = require("./routes/authRoutes")

//Connect to DB
connectDB()

//Initialize express
const app = express()

//Registering middleware
//app.use(logger)
if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"))
}

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//File upload
app.use(fileupload())

//Cookie parser
app.use(cookieParser())

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Registering Routes
app.use("/api/v1/bootcamps", bootcampsRoutes)
app.use("/api/v1/courses", coursesRoutes)
app.use("/api/v1/auth", authRoutes)
app.use(errorHandler)



app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))