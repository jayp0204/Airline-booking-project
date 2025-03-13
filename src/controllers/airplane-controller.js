const { StatusCodes } = require("http-status-codes");
const AirplaneService = require("../services/airplane-service");

const createAirplane = async (req, res) => {
  try {
    console.log("Request received:", req.body); // Log the request body
    const airplane = await AirplaneService.createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });
    console.log("Airplane created:", airplane); // Log the created
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Airplane created successfully",
      data: airplane,
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong",
      data: {},
      error: error
    });
  }
};

module.exports = {
  createAirplane,
};