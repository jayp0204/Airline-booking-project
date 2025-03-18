const { AirplaneRepository } = require("../repositories");
// const airplaneRepository = require("../repositories/airplane-repository");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");

// const airplaneRepository = new AirplaneRepository();

const createAirplane = async (data) => {
  try {
    const airplane = await AirplaneRepository.create(data);
    return airplane;
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new airplane object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const getAirplanes = async () => {
  try {
    const airplanes = await AirplaneRepository.getAll();
    return airplanes;
  } catch (error) {
    throw new AppError(
      "Cannot fetch the data of all airplanes",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const getAirplane = async (id) => {
  try {
    const airplane = await AirplaneRepository.get(id);
    return airplane;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError("Airplane not found", error.statusCode);
    }
    throw new AppError(
      "Cannot fetch the data of an airplane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const destroyAirplane = async (id) => {
  try {
    const response = await AirplaneRepository.destroy(id);
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError("Airplane not found", error.statusCode);
    }
    throw new AppError(
      "Cannot fetch the data of the airplane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  createAirplane,
  getAirplanes,
  getAirplane,
  destroyAirplane,
};
