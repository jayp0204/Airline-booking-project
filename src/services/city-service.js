const { CityRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");

const createCity = async (data) => {
  try {
    // console.log(data, "data");
    const city = await CityRepository.create(data);
    // console.log(city)
    return city;
  } catch (error) {
    console.log(error);
    // if(error.name === )
    if (
      error.name == "SequelizeValidationError" ||
      error.name == "SequelizeUniqueConstraintError"
    ) {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new city object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const getAllCities = async () => {
  try {
    const cities = await CityRepository.getAll();
    return cities;
  } catch (error) {
    throw new AppError(
      "Cannot fetch the data of all cities",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const updateCity = async (id, data) => {
  try {
    const city = await CityRepository.update(id, data);
    return city;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError("Airplane not found", error.statusCode);
    }
    throw new AppError(
      "Cannot update the airplane details",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const destroyCity = async (id) => {
  try {
    const city = await CityRepository.destroy(id);
    return city;
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
  createCity,
  destroyCity,
  getAllCities,
  updateCity
};
