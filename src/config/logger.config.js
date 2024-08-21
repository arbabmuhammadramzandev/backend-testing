const pino = require("pino");
require("dotenv").config({ path: __dirname + "/../.env" });

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "yyyy-dd-mm, h:MM:ss TT",
      ignore: "pid,hostname",
      destination: (process.env.NODE_ENV = "development"
        ? "./logs/pinoLoggerDEV.log"
        : "./logs/pinoLoggerPROD.log"),
    },
  },
});
module.exports = logger;
