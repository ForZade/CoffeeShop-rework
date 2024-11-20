import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const userValidarots = {
    editUser: [
        body("first_name") // Validates email
            .notEmpty()
                .withMessage("Vardas negali būti tuščias.")
            .matches(/^[A-Za-z]+$/)
                .withMessage("Vardas negali turėti specialiųjų simbolių"),
    
        body("last_name") // Validates last name
            .notEmpty()
                .withMessage("Prašome pateikti pavardę")
            .matches(/^[A-Za-z\s]+$/)
                .withMessage("Pavardė negali turėti specialiųjų simbolių"),
    
        (req: Request, res: Response, next: NextFunction) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
          next();
        },
      ],

    contacts: [
      body("email")
        .notEmpty()
          .withMessage("Prašome pateikti El.paštą.")
        .isEmail()
          .withMessage("Neteisingas El.pašto formatas."),

      body("subject")
        .notEmpty()
          .withMessage("Prašome pateikti tema.")
        .matches(/^[A-Za-z]+$/)
          .withMessage("Tema negali turėti specialiųjų simbolių"),

      body("message")
        .notEmpty()
          .withMessage("Prašome pateikti zinė."),

      (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
      }
    ]
}

export default userValidarots