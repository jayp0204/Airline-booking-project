const { StatusCodes } = require("http-status-codes");
const { AirportService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

const createAirport = async (req, res) => {
  try {
    // console.log("Request received:", req.body); // Log the request body
    const airport = await AirportService.createAirport({
      name: req.body.name,
      code: req.body.code,
      address: req.body.address,
      cityId: req.body.cityId,
    });
    // console.log("Success");
    SuccessResponse.data = airport;
    // console.log("Airport created:", airport); // Log the created
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

const getAirports = async (req, res) => {
  try {
    const airports = await AirportService.getAirports();
    SuccessResponse.data = airports;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

// Get -> /airports/:id
const getAirport = async (req, res) => {
  try {
    const airports = await AirportService.getAirport(req.params.id);
    SuccessResponse.data = airports;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

const updateAirport = async (req, res) => {
  try {
    const airport = await AirportService.updateAirport(req.params.id, req.body);
    SuccessResponse.data = airport;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

const destroyAirport = async (req, res) => {
  try {
    const airport = await AirportService.destroyAirport(req.params.id);
    SuccessResponse.data = airport;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

module.exports = {
  createAirport,
  getAirports,
  getAirport,
  destroyAirport,
  updateAirport,
};
