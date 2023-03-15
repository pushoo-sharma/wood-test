const winston = require("winston");
require("winston-mongodb");
const { format, createLogger, transports } = winston;
const { timestamp, combine, errors, json } = format;

const buildProdLogger = () => {
  return createLogger({
    format: combine(
      timestamp(),
      errors({ stack: true }),
      json(),
      format.metadata()
    ),
    defaultMeta: { service: "single-service", ENV: process.env.NODE_ENV },
    transports: [
      new transports.MongoDB({
        db: process.env.DATABASE_URL,
        options: { useNewUrlParser: true, useUnifiedTopology: true },
        collection: "errorLogs",
        level: "error",
      }),
      new transports.MongoDB({
        db: process.env.DATABASE_URL,
        options: { useNewUrlParser: true, useUnifiedTopology: true },
        collection: "infoLogs",
        level: "info",
      }),
      new transports.MongoDB({
        db: process.env.DATABASE_URL,
        options: { useNewUrlParser: true, useUnifiedTopology: true },
        collection: "warnLogs",
        level: "warn",
      }),
    ],
  });
};

module.exports = buildProdLogger;
