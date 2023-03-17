const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  let customerError = {
    //set default
    statusCode: err.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong please try again later",
  };

  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  if (err.code && err.code === 11000) {
    customerError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, Please choose another value`
    customerError.statusCode = 400
  }

  return res.status(customerError.statusCode).json({ msg: customerError.msg });
};

module.exports = errorHandlerMiddleware;
