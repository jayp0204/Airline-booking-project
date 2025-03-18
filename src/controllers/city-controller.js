const { StatusCodes } = require("http-status-codes");
const { CityService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

const createCity = async (req, res) => {
  try {
    console.log("Request received:", req.body); // Log the request body
    const city = await CityService.createCity({
      name: req.body.name,
    });
    // console.log("Success");
    SuccessResponse.data = city;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

const getAllCities = async (req, res) => {
  try {
    const cities = await CityService.getAllCities();
    SuccessResponse.data = cities;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

const updateCity = async (req, res) => {
  try {
    const city = await CityService.updateCity(req.params.id, req.body);
    SuccessResponse.data = city;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

const destroyCity = async (req, res) => {
  try {
    const city = await CityService.destroyCity(req.params.id);
    SuccessResponse.data = city;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

module.exports = {
  createCity,
  destroyCity,
  getAllCities,
  updateCity
};
