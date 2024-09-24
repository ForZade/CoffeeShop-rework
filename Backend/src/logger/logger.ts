import { createLogger, format, transports } from 'winston';

// Create a logger instance
const logger = createLogger({
  level: 'info', // Minimum level to log (e.g., 'info', 'warn', 'error')
  format: format.combine(
    format.colorize(),
    format.timestamp(),              // Add a timestamp
    format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new transports.Console(),         // Log to the console
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // Logs only errors to error.log
    new transports.File({ filename: 'logs/combined.log' }) // Log to a file
  ]
});

export default logger;
