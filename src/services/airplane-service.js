const { AirplaneRepository } = require("../repositories");
const airplaneRepository = require("../repositories/airplane-repository");
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
    const airplanes = await airplaneRepository.getAll();
    return airplanes;
  } catch (error) {
    throw new AppError(
      "Cannot fetch the data of all airplanes",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  createAirplane,
  getAirplanes
};
