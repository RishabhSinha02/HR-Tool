const mongoose = require("mongoose");
const config = require("./config");

function createDatabaseConnection() {
  mongoose.set("strictQuery", false);
  mongoose.connect(config.dbConnectionURL);

  const database = mongoose.connection;

  database.on("error", function (err) {
    console.error("Error connecting database", new Error(err));
  });

  database.on("disconnected", function (ref) {
    console.log("Disconnected from database");
  });

  database.on("connected", function (ref) {
    console.log("Connected to database");
  });

  return database;
}

module.exports = createDatabaseConnection;
