// import { body, validationResult } from "express-validator";
// import { Request, Response, NextFunction } from "express";

// // Middleware for validating email in the body
// export const validateEmailBody = [
//   body("email")
//     .isEmail()
//     .withMessage("Invalid email format")
//     .notEmpty()
//     .withMessage("Email must not be empty"),
//   (req: Request, res: Response, next: NextFunction) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     next();
//   },
// ];
