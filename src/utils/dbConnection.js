require("dotenv").config({ path: __dirname + "/../.env" });
const mongoose = require("mongoose");
const moment = require("moment");
const config = require("../../config")
const logger = require("../config/logger.config");

function dbConnect() {
  // if (process.env.NODE_ENV === "development") {
  mongoose.connect(config.mongoUri)
  console.log(`MongoDB DEVELOPMENT Connected at ${moment()}`);
  // }
  // else {
  //   mongoose.connect(
  //   );
  //   console.log(`MongoDB PRODUCTION Connected at ${moment()}`);
  // }
}

function dbClose() {
  console.log(`MangoDB Disconnected at ${moment()} `);
  return mongoose.disconnect();
}

module.exports = { dbConnect, dbClose };





