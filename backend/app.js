const express = require("express")
const PORT = 9000
const app = express();
const authroute = require("./routes/auth.route");
const carroute = require("./routes/car.route");
const bodypparser = require("body-parser")
require("./utils/dbconnect");
app.use(bodypparser.json());
app.use("/auth",authroute);
app.use("/car",carroute);
app.listen(PORT,()=>console.log("Ok"));
module.exports = app;