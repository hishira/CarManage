const express = require("express");
const app = express();
const AuthController = require("../controllers/auth.controller")
const {userpasswordcheck,emailcheck} = require("../middleware/auth");
app.post("/signup", emailcheck, userpasswordcheck, AuthController.SignUp);
app.post("login");

module.exports = app;
