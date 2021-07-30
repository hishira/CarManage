const express = require("express");
const app = express();
const AuthController = require("../controllers/auth.controller");
const {
  userpasswordcheck,
  emailcheck,
  userpasswordsequencecheck,
} = require("../middleware/auth");
app.post(
  "/signup",
  emailcheck,
  userpasswordcheck,
  userpasswordsequencecheck,
  AuthController.SignUp
);
app.post("/login",emailcheck, AuthController.Login);

module.exports = app;
