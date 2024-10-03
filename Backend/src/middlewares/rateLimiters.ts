import rateLimit from "express-rate-limit";

const rateLimiters = {
  //^ 5 login requests per 5 minutes
  loginLimiter: rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 50,
    message: "Too many requests from this IP, please try again after 5 minutes",
    standardHeaders: true,
    legacyHeaders: false,
  }),

  //^ 2 requests per 1 day
  requestPasswordLimiter: rateLimit({
    windowMs: 24 * 60 * 60 * 1000,
    max: 2,
    message: "Too many requests from this IP, please try again after 24 hours",
    standardHeaders: true,
    legacyHeaders: false,
  }),

  //^ 5 requests per 30 minutes
  resendVerificationLimiter: rateLimit({
    windowMs: 30 * 60 * 1000,
    max: 5,
    message: "Too many requests from this IP, please try again after 1 hour",
    standardHeaders: true,
    legacyHeaders: false,
  }),

  //^ 1 request per 10 seconds
  defaultLimiter: rateLimit({
    windowMs: 10 * 1000,
    max: 1,
    message: "Give it another 10 seconds",
    standardHeaders: true,
    legacyHeaders: false,
  }),
};

export default rateLimiters;
