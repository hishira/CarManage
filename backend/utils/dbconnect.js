const mognoose = require("mongoose");
require("dotenv").config();
let url;
if (process.env.NODE_ENV !== "test")
  url = `mongodb://${process.env.DB_HOST}/${process.env.DBNAME}`;
else url = `mongodb://${process.env.DB_HOST}/${process.env.TESTDB}`;
mognoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
let connect = mognoose.connection;
connect.once("open",()=>{
    console.log("Database connection");
})
module.exports = connect;