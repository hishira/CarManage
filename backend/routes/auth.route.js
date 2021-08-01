const express = require("express");
const app = express();
const AuthController = require("../controllers/auth.controller");
const {
  userpasswordcheck,
  emailcheck,
  userpasswordsequencecheck,
  specialcharacter
} = require("../middleware/auth");
const {
  refreshtokenVerify,
  checkheadAuthorization,
  checkBearerTokenHeader,
} = require("../middleware/jwtcheck");

app.post(
  "/signup",
  emailcheck,
  userpasswordcheck,
  userpasswordsequencecheck,
  specialcharacter,
  AuthController.SignUp
);
app.post("/login", emailcheck, userpasswordcheck, AuthController.Login);
app.get(
  "/refreshtoken",
  checkheadAuthorization,
  checkBearerTokenHeader,
  refreshtokenVerify,
  AuthController.RefreshToken
);
module.exports = app;
