const mongoose = require("mongoose");  // data base connection

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

db.on("error", console.error.bind("Error connecting to MongoDB"));

db.once("open", function () {
  console.log("Conneted to Database:: MongoDB");
});

module.exports = db;