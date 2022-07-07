const express = require('express')
const path = require('path');
const dotenv  = require('dotenv').config()
const fileupload = require('express-fileupload')
const PORT    = process.env.PORT || 5000
const logger  = require('./middleware/logger')
const morgan  = require('morgan')
const cookieParser = require('cookie-parser')
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const cors = require('cors')
const colors = require('colors');
const connectDB = require("./config/db")
const {errorHandler} = require("./middleware/errorMiddleware")
const bootcampsRoutes = require('./routes/bootcampsRoutes')
const coursesRoutes = require("./routes/courseRoutes")
const authRoutes = require("./routes/authRoutes")
const usersRoutes = require("./routes/usersRoutes")
const reviewsRoutes = require("./routes/reviewsRoutes")

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

//Sanitize data from request
app.use(mongoSanitize());

//Set security headers
app.use(helmet())

//prevent XSS Attacks
app.use(xss())

//rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,  //10 mins
    max: 10    // 10 request per 10mins
})
app.use(limiter)

//prevent http param pollution
app.use(hpp())

//Cors Enable
app.use(cors())

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Registering Routes
app.use("/api/v1/bootcamps", bootcampsRoutes)
app.use("/api/v1/courses", coursesRoutes)
app.use("/api/v1/auth", authRoutes)
app.use('/api/v1/users', usersRoutes);
app.use("/api/v1/reviews", reviewsRoutes)
app.use(errorHandler)



app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))