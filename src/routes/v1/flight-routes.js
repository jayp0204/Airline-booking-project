const express = require("express");

const { FlightController } = require("../../controllers");
const { FlightMiddlewares } = require("../../middlewares");
const router = express.Router();

// /api/v1/flight -> POST
router.post(
  "/",
  FlightMiddlewares.validateCreateRequest,
  FlightController.createFlight
);

// /api/v1/flight?trips = SAR-CHI -> GET
router.get(
    "/",
    FlightController.getAllFlights
  );

  // /api/v1/airplane/:id
router.get("/:id", FlightController.getFlight);

module.exports = router;
