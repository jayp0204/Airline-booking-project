const { StatusCodes } = require("http-status-codes");

const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

const validateCreateRequest = (req, res, next) => {
  if (!req.body.flightNumber) {
    ErrorResponse.message = "Something went wrong";
    ErrorResponse.error = new AppError(
      ["Flight Number not found in the incoming request in the correct form"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.airplaneId) {
    ErrorResponse.message = "Something went wrong";
    ErrorResponse.error = new AppError(
      ["Airplane Id not found in the incoming request in the correct form"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.departureAirportId) {
    ErrorResponse.message = "Something went wrong";
    ErrorResponse.error = new AppError(
      [
        "Departure Airport Id not found in the incoming request in the correct form",
      ],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.arrivalAirportId) {
    ErrorResponse.message = "Something went wrong";
    ErrorResponse.error = new AppError(
      [
        "arrivalAirportId not found in the incoming request in the correct form",
      ],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.arrivalTime) {
    ErrorResponse.message = "Something went wrong";
    ErrorResponse.error = new AppError(
      ["arrivalTime not found in the incoming request in the correct form"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.departureTime) {
    ErrorResponse.message = "Something went wrong";
    ErrorResponse.error = new AppError(
      ["departureTime not found in the incoming request in the correct form"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.price) {
    ErrorResponse.message = "Something went wrong";
    ErrorResponse.error = new AppError(
      ["price not found in the incoming request in the correct form"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  // if (!req.body.boardingGate) {
  //   ErrorResponse.message = "Something went wrong";
  //   ErrorResponse.error = new AppError(
  //     ["boardingGate not found in the incoming request in the correct form"],
  //     StatusCodes.BAD_REQUEST
  //   );
  //   return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  // }
  if (!req.body.totalSeats) {
    ErrorResponse.message = "Something went wrong";
    ErrorResponse.error = new AppError(
      ["totalSeats not found in the incoming request in the correct form"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
};

const validateUpdateSeatsRequest = (req, res, next) => {
  if (!req.body.seats) {
    ErrorResponse.message = "Something went wrong";
    ErrorResponse.error = new AppError(
      ["seats not found in the incoming request in the correct form"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}


module.exports = {
  validateCreateRequest,
  validateUpdateSeatsRequest,
};
