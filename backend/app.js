const express = require("express")
const PORT = 9000
const app = express();
const authroute = require("./routes/auth.route");
const bodypparser = require("body-parser")
require("./utils/dbconnect");
app.use(bodypparser.json())
app.use("/auth",authroute)
app.listen(PORT,()=>console.log("Ok"));
module.exports = app;