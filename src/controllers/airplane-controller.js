const { StatusCodes } = require("http-status-codes");
const { AirplaneService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

const createAirplane = async (req, res) => {
  try {
    // console.log("Request received:", req.body); // Log the request body
    const airplane = await AirplaneService.createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });
    // console.log("Success");
    SuccessResponse.data = airplane;
    // console.log("Airplane created:", airplane); // Log the created
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

module.exports = {
  createAirplane,
};
