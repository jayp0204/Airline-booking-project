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

module.exports = {
    createCity
}