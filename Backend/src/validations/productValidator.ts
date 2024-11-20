import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const productValidator = [
  body("name")
    .notEmpty()
    .withMessage("Prekės pavadinimas negali būti tuščias.")
    .isLength({ max: 64 })
    .withMessage("Prekės pavadinimas negali būti ilgesnis nei 64 simboliai."),

  body("description")
    .notEmpty()
    .withMessage("Prekės aprašymas negali būti tuščias.")
    .isLength({ max: 512 })
    .withMessage("Prekės aprašymas negali būti ilgesnis nei 512 simbolių."),

  body("category")
    .notEmpty()
    .withMessage("Prekės kategorija negali būti tuščia.")
    .isLength({ max: 64 })
    .withMessage("Prekės kategorija negali būti ilgesnė nei 64 simboliai."),

  body("price")
    .notEmpty()
    .withMessage("Prekės kaina negali būti tuščia.")
    .isFloat({ min: 0.01 })
    .withMessage("Prekės kaina negali būti mažesnė nei 1 euro centas.")
    .isFloat({ max: 10000 })
    .withMessage("Prekės kaina negali būti didesnė nei 10000 eurų."),

  body("size")
    .notEmpty()
    .withMessage("Produkto dydis negali būti tuščias.")
    .isNumeric()
    .withMessage("Produkto dydis turi būti skaičius.")
    .isFloat({ min: 1 })
    .withMessage("Produkto dydis negali būti mažesnis nei 1 gramas.")
    .isFloat({ max: 10000 })
    .withMessage("Produkto dydis negali būti didesnis nei 10 kilogramų."),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export default productValidator;