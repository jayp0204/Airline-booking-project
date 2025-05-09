const { FlightRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");
const { compareTime } = require("../utils/helpers/dateTime-helper");
const { Op } = require("sequelize");

// const flightRepository = new FlightRepository();

const createFlight = async (data) => {
  try {
    console.log(data, "data");
    if (!compareTime(data.departureTime, data.arrivalTime)) {
      throw new AppError(
        "Departure time must be earlier than arrival time",
        StatusCodes.BAD_REQUEST
      );
    }
    const flight = await FlightRepository.create(data);
    return flight;
  } catch (error) {
    console.log(error);
    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new flig ht object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const getAllFlights = async (query) => {
  let customFilter = {};
  let sortFilter = [];
  const endingTripTime = " 23:59:00";

  if (query.trips) {
    [departureAirportId, arrivalAirportId] = query.trips.split("-");
    customFilter.departureAirportId = departureAirportId;
    customFilter.arrivalAirportId = arrivalAirportId;

    //TODO: add a check that departureAirportId and arrivalAirportId are not the same
    if (departureAirportId == arrivalAirportId) {
      throw new AppError(
        "Departure and Arrival airports cannot be the same",
        StatusCodes.BAD_REQUEST
      );
    }

    if (query.price) {
      [minPrice, maxPrice] = query.price.split("-");
      customFilter.price = {
        [Op.between]: [minPrice, maxPrice == undefined ? 20000 : maxPrice],
      };
    }

    if (query.travellers) {
      customFilter.totalSeats = {
        [Op.gte]: query.travellers,
      };
    }

    if (query.tripDate) {
      customFilter.departureTime = {
        [Op.between]: [query.tripDate, query.tripDate + endingTripTime],
      };
    }

    if (query.sort) {
      const params = query.sort.split(",");
      const sortFilters = params.map((param) => param.split("_"));
      sortFilter = sortFilters;
    }

    // TODO: add a check that total seats <= capacity of the airplane
    try {
      const flights = await FlightRepository.getAllFlights(
        customFilter,
        sortFilter
      );
      return flights;
    } catch (error) {
      console.log(error);
      throw new AppError(
        "Cannot fetch the data of all flights",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
};

const getFlight = async (id) => {
  try {
    const flight = await FlightRepository.get(id);
    return flight;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError("Flight not found", error.statusCode);
    }
    throw new AppError(
      "Cannot fetch the data of an flight",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const updateSeats = async (data) => {
  try {
    const flight = await FlightRepository.updateRemainingSeats(data.flightId, data.seats, data.dec);
    return flight;
} catch (error) {
  console.log(error);
  throw new AppError(
    "Cannot update the data of flight",
    StatusCodes.INTERNAL_SERVER_ERROR
  );
}
};

module.exports = {
  createFlight,
  getAllFlights,
  getFlight,
  updateSeats,
};
