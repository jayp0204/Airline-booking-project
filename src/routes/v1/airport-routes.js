const express = require("express");

const { AirportController } = require("../../controllers");
const { AirportMiddlewares } = require("../../middlewares");
const router = express.Router();

// /api/v1/Airports -> POST
router.post(
  "/",
  AirportMiddlewares.validateCreateRequest,
  AirportController.createAirport
);

// /api/v1/Airports -> GET
router.get("/", AirportController.getAirports);

// /api/v1/Airports/:id
router.get("/:id", AirportController.getAirport);

// /api/v1/Airports/:id
router.patch("/:id", AirportController.updateAirport);

router.delete("/:id", AirportController.destroyAirport);

module.exports = router;
