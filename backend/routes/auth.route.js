const express = require("express");
const app = express();
const AuthController = require("../controllers/auth.controller")
app.post("signup", AuthController.SignUp);
app.post("login");

module.exports = app;
