const ErrorResponse = require('../helpers/errorResponse')


const errorHandler = (err, req, res, next) => {

  let error = { ...err };

  error.message = err.message;

  // Log to console for dev
  console.log("Exact Error Name ======================> " + err.name);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 400);
  }

    const statusCode = error.statusCode ? error.statusCode : 500
    res.status(statusCode)
    res.json({
      message: error.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
}
  
module.exports = { errorHandler }