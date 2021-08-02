const express = require("express");
const app = express();
const UserController = require("../controllers/user.controller");
const {
  checkheadAuthorization,
  checkBearerTokenHeader,
  accessTokenCheck,
} = require("../middleware/jwtcheck");
app.get(
  "/userinfo",
  checkheadAuthorization,
  checkBearerTokenHeader,
  accessTokenCheck,
  UserController.GetUserInfo
);
app.delete("/deleteuser", UserController.DeleteUser);
app.post("/userwithcar", UserController.CreateUserWithCar)
module.exports = app;
