import { body } from "express-validator";

export const CARD_VALIDATOR = [
<<<<<<< HEAD
    body("cardNumber")
        .isLength({ min: 13, max: 19 })
        .withMessage('CARD NUMBER MUST BE BETWEEN 13 AND 19 CHARACTERS'),
    body("cvv")
        .isLength({ min: 3, max: 4 })
        .withMessage('CVC/CVV 3 DIGITS, CID 4 DIGITS'),
    body('expiryDate')
        .custom((value) => { // Example used : "05/27"
            const today = new Date();
            const currentMonth = today.getMonth() + 1;
            const currentYear = today.getFullYear() % 1000; // 2024 / 1000 Liekana 0024 -> 24
            const month = parseInt(value.slice(0, 2), 10); // "05" -> 5
            const year = parseInt(value.slice(2, 4), 10);  // "27" -> 27     

             // 27   < 24              27   === 24             06    <= 05
            if (year < currentYear || (year === currentYear && month <= currentMonth)) {
                return false
            }
            return true; // since 27 !< 24 OR 27 !== 24, it will be validated skipping IF statment
        })
        .withMessage("EXPIRED CARD"),
    body("name")
        .isLength({ min: 3, max: 50 })
        .withMessage('NAME MUST BE BETWEEN 3 AND 50 CHARACTERS'),
=======
  body("cardNumber")
    .isLength({ min: 13, max: 19 })
    .withMessage("CARD NUMBER MUST BE BETWEEN 13 AND 19 CHARACTERS"),
  body("cvc")
    .isLength({ min: 3, max: 4 })
    .withMessage("CVC/CVV 3 DIGITS, CID 4 DIGITS"),
  body("expiryDate")
    .custom((value) => {
      // Example used : "05/27"
      const today = new Date();
      const currentMonth = today.getMonth() + 1;
      const currentYear = today.getFullYear() % 1000; // 2024 / 1000 Liekana 0024 -> 24
      const month = parseInt(value.slice(0, 2), 10); // "05" -> 5
      const year = parseInt(value.slice(2, 4), 10); // "27" -> 27

      // 27   > 24              24   === 24             06    >= 05
      if (
        year > currentYear ||
        (year === currentYear && month >= currentMonth)
      ) {
        return false;
      }
      return true;
    })
    .withMessage("EXPIRED CARD"),
>>>>>>> 774ed79b644b5dd6e8462fdb565ee2d187c1096f
];
