import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const authValidator = {
  register: [
    body("email") // Validates email
      .isEmail()
      .withMessage("Neteisingas El.pašto formatas.")
      .notEmpty()
      .withMessage("Prašome pateikti El.paštą."),

    body("password") // Validates password
      .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage("Slaptažodis turi atitikti nurodytus reikalavimus.")
      .notEmpty()
      .withMessage("Prašome pateikti slaptažodį."),

    body("first_name") // Validates first name
      .notEmpty()
      .withMessage("Prašome pateikti vardą.")
      .matches(/^[A-Za-z]+$/)
      .withMessage("Vardas negali turėti specialiųjų simbolių"),

    body("last_name") // Validates last name
      .notEmpty()
      .withMessage("Prašome pateikti pavardę")
      .matches(/^[A-Za-z]+$/)
      .withMessage("Pavardė negali turėti specialiųjų simbolių"),

    body("repeat_password") // Validates repeat password
      .notEmpty()
      .withMessage("Prašome pateikti slaptažodį.")
      .custom((value, { req }) => {
        console.log(value, req.body.password);
        if (value !== req.body.password) {
          throw new Error("Slaptažodžiai nesutampa.");
        }
        return true;
      }),

    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],
  passwordReset: [
    body("password")
      .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage("Slaptažodis turi atitikti nurodytus reikalavimus.")
      .notEmpty()
      .withMessage("Prašome pateikti slaptažodį."),

    body("repeat_password")
      .notEmpty()
      .withMessage("Prašome pakartoti slaptažodį.")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Slaptažodžiai nesutampa.");
        }
        return true;
      }),

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
      .withMessage("Neteisingas El.pašto formatas.")
      .notEmpty()
      .withMessage("Prašome pateikti El.paštą."),

    body("password") // Validates password
      .notEmpty()
      .withMessage("Prašome pateikti slaptažodį."),

    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],
  
  changePassword: [
    body("password")
      .notEmpty()
      .withMessage("Prašome pateikti slaptažodį."),
    
    body("newPassword")
      .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage("Naujas slaptažodis turi atitikti nurodytus reikalavimus.")
      .notEmpty()
      .withMessage("Prašome pateikti nauja slaptažodį."),
  
    body("confirmPassword")
      .notEmpty()
      .withMessage("Prašome pakartoti slaptažodį.")
      .custom((value, { req }) => {
        if (value !== req.body.newPassword) { // Check against newPassword
          throw new Error("Slaptažodžiai nesutampa.");
        }
        return true;
      }),
  
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],
};

export default authValidator;
