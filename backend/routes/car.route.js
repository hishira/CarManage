const express = require("express");
const CarController = require("../controllers/car.controller");
const app = express();
app.post("/create", CarController.Create);
app.put("/edit/:id", CarController.Edit)
app.delete("/delete/:id", CarController.Delete)
module.exports = app;
