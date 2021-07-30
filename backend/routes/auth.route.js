const express = require("express");
const app = express();
const AuthController = require("../controllers/auth.controller");
const {
  userpasswordcheck,
  emailcheck,
  userpasswordsequencecheck,
} = require("../middleware/auth");
const {refreshtokenVerify} = require("../middleware/jwtcheck");
app.post(
  "/signup",
  emailcheck,
  userpasswordcheck,
  userpasswordsequencecheck,
  AuthController.SignUp
);
app.post("/login",emailcheck, AuthController.Login);
app.get("/refreshtoken", refreshtokenVerify,AuthController.RefreshToken)
module.exports = app;
