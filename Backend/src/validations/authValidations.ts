import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const authValidation = {
  register: [
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
      .withMessage("Password does not match strength requirements"),

    body("first_name") // Validates first name
      .notEmpty()
      .withMessage("First name must not be empty")
      .matches(/^[A-Za-z]+$/)
      .withMessage("First name cannot contain any symbols"),

    body("last_name") // Validates last name
      .notEmpty()
      .withMessage("Last name must not be empty")
      .matches(/^[A-Za-z]+$/)
      .withMessage("Last name cannot contain any symbols"),

    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],

  login: [
    body("email") // Validates email
      .isEmail()
      .withMessage("Invalid email format")
      .notEmpty()
      .withMessage("Email must not be empty"),

    body("password") // Validates password
      .notEmpty()
      .withMessage("Password must not be empty.")
      .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage(
        "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one symbol.",
      ),

    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],
};

export default authValidation;
