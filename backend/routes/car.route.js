const express = require("express");
const CarController = require("../controllers/car.controller");
const {valididcheck} = require("../middleware/car");
const app = express();
const {
  checkBearerTokenHeader,
  checkheadAuthorization,
  accessTokenCheck,
} = require("../middleware/jwtcheck");
app.post(
  "/create",
  checkheadAuthorization,
  checkBearerTokenHeader,
  accessTokenCheck,
  CarController.Create
);
app.put(
  "/edit/:id",
  checkheadAuthorization,
  checkBearerTokenHeader,
  accessTokenCheck,
  valididcheck,
  CarController.Edit
);
app.delete(
  "/delete/:id",
  checkheadAuthorization,
  checkBearerTokenHeader,
  accessTokenCheck,
  valididcheck,
  CarController.Delete
);
module.exports = app;
