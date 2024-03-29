const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  //   Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Resources not found with the id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  //   Mongoose Validation Error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }


  if (err.code === 11000) {
    const message = 'Email already exists'
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = errorHandler;
