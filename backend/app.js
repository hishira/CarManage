const express = require("express");
const PORT = 9000;
const app = express();
const authroute = require("./routes/auth.route");
const carroute = require("./routes/car.route");
const userroute = require("./routes/user.route");
const bodypparser = require("body-parser");
const cors = require("cors");
const option = {
  origin: "http://localhost:3000",
};
app.use(cors(option));
require("./utils/dbconnect");
app.use(bodypparser.json());
app.use("/auth", authroute);
app.use("/car", carroute);
app.use("/user",userroute)
app.listen(PORT, () => console.log("Ok"));
module.exports = app;
