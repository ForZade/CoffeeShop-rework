import { createLogger, format, transports } from "winston";
import path from "path";
import { Request, Response, NextFunction } from "express";

const infoLogPath = path.join(__dirname, "../logs", "info.log");
const errorLogPath = path.join(__dirname, "../logs", "error.log");
const mainErrorLogPath = path.join(__dirname, "../logs", "mainError.log");

const jsonFormat = format.printf(({ message, timestamp, ...meta }) => {
  const logObject = {
    status: meta.status || "N/A",
    message: message,
    user_id: meta.user_id || undefined,
    order_id: meta.order_id || undefined,
    product_id: meta.product_id || undefined,
    created_at: timestamp,
  };
  return JSON.stringify(logObject);
});

const logger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), jsonFormat),
  transports: [
    new transports.File({ filename: errorLogPath, level: "error" }),
    new transports.File({ filename: infoLogPath, level: "info" }),
  ],
});

if (process.env.NODE_ENV === "development") {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.timestamp(), jsonFormat),
    }),
  );
} else if (process.env.NODE_ENV === "production") {
  logger.clear();
  logger.add(
    new transports.File({ filename: mainErrorLogPath, level: "error" }),
  );
}

const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  logger.info("Request received", {
    status: res.statusCode,
    user_id: req.body.user_id,
    order_id: req.body.order_id,
    product_id: req.body.product_id,
  });

  res.on("finish", () => {
    if (res.statusCode >= 400) {
      logger.error("Error occurred", {
        status: res.statusCode,
        message: res.statusMessage,
        user_id: req.body.user_id,
        order_id: req.body.order_id,
        product_id: req.body.product_id,
      });
    }
  });

  next();
};

export { logger, loggerMiddleware };
