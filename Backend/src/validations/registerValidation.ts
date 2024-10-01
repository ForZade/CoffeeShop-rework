import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const registerValidation = [
  body("email") // Validates email
    .isEmail()
    .withMessage("Invalid email format")
    .notEmpty()
    .withMessage("Email must not be empty"),

  body("password") // Validates password
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage("Password must meet strength requirements"),

  body("first_name") // Validates first name
    .notEmpty()
    .withMessage("First name must not be empty")
    .matches(/^[A-Za-z]+$/)
    .withMessage("First name must contain only alphabetic characters"),

  body("last_name") // Validates last name
    .notEmpty()
    .withMessage("Last name must not be empty")
    .matches(/^[A-Za-z]+$/)
    .withMessage("Last name must contain only alphabetic characters"),

  body("age").isInt({ max: 100 }).withMessage("Age must be less than 100"), // Validate age

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
