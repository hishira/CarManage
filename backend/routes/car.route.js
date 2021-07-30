const express = require("express");
const app = express();
app.post("/create");
app.put("/edit/:id")
app.delete("/delete/:id")
module.exports = app;
