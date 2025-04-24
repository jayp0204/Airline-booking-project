const { Sequelize } = require("sequelize");
const CrudRepository = require("./crud-repository");
const { Flight, Airplane, Airport, City } = require("../models");
const db = require("../models");
const { addRowLockOnFlights } = require("./queries");

class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight);
  }

  async getAllFlights(filter, sort) {
    const response = await Flight.findAll({
      where: filter,
      order: sort,
      include: [
        {
          model: Airplane,
          required: true,
          as: "airplaneDetail",
          // attributes: ["modelNumber", "capacity"],
        },
        {
          model: Airport,
          required: true,
          as: "departureAirport",
          on: {
            col1: Sequelize.where(
              Sequelize.col("Flight.departureAirportId"),
              "=",
              Sequelize.col("departureAirport.code")
            ),
          },
          include: {
            model: City,
            required: true,
          },
        },
        {
          model: Airport,
          required: true,
          as: "arrivalAirport",
          on: {
            col1: Sequelize.where(
              Sequelize.col("Flight.arrivalAirportId"),
              "=",
              Sequelize.col("arrivalAirport.code")
            ),
          },
          include: {
            model: City,
            required: true,
          },
        },
      ],
    });
    return response;
  }

  async updateRemainingSeats(flightId, seats, dec = true) {
    const transaction = await db.sequelize.transaction(); // Await the transaction initialization

    try {
      await db.sequelize.query(addRowLockOnFlights(flightId), { transaction }); // Ensure the query uses the transaction

      const flight = await Flight.findByPk(flightId, { transaction }); // Use the transaction for consistency

      if (dec) {
        await flight.decrement("totalSeats", { by: seats, transaction }); // Pass the transaction here
      } else {
        await flight.increment("totalSeats", { by: seats, transaction }); // Pass the transaction here
      }

      await transaction.commit(); // Commit the transaction
      return flight;
    } catch (error) {
      await transaction.rollback(); // Rollback the transaction on error
      throw error;
    }
  }
}

module.exports = new FlightRepository();
