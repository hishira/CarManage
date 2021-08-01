const express = require("express");
const CarController = require("../controllers/car.controller");
const {
  valididcheck,
  carintrodatevalid,
  caryearvalid,
  actualrun,
} = require("../middleware/car");
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
  carintrodatevalid,
  caryearvalid,
  actualrun,
  CarController.Create
);
app.put(
  "/edit/:id",
  checkheadAuthorization,
  checkBearerTokenHeader,
  accessTokenCheck,
  valididcheck,
  carintrodatevalid,
  caryearvalid,
  actualrun,
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
app.get(
  "/cars",
  checkheadAuthorization,
  checkBearerTokenHeader,
  accessTokenCheck,
  CarController.GetByUser
);
app.get(
  "/carinfo/:id",
  checkheadAuthorization,
  checkBearerTokenHeader,
  accessTokenCheck,
  CarController.GetCar
);
module.exports = app;
