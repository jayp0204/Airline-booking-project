const { AirportRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");

// const airportRepository = new AirportRepository();

const createAirport = async (data) => {
  try {
    // console.log(data, "data");
    const airport = await AirportRepository.create(data);
    return airport;
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new airport object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const getAirports = async () => {
  try {
    const airports = await AirportRepository.getAll();
    return airports;
  } catch (error) {
    throw new AppError(
      "Cannot fetch the data of all airports",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const getAirport = async (id) => {
  try {
    const airport = await AirportRepository.get(id);
    return airport;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError("Airport not found", error.statusCode);
    }
    throw new AppError(
      "Cannot fetch the data of an airport",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const updateAirport = async (id, data) => {
  try {
    const updatedAirport = await AirportRepository.update(id, data);
    return updatedAirport;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError("Airport not found", error.statusCode);
    }
    throw new AppError(
      "Cannot update the airport details",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const destroyAirport = async (id) => {
  try {
    const response = await AirportRepository.destroy(id);
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError("Airport not found", error.statusCode);
    }
    throw new AppError(
      "Cannot fetch the data of the airport",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  createAirport,
  getAirports,
  getAirport,
  destroyAirport,
  updateAirport,
};
