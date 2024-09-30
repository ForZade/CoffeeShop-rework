import  express from "express";
import transactionController from '../../controllers/transactionsController';
import { CARD_VALIDATOR } from "../../middlewares/cardValidator";
const router = express.Router();

router.post("/", CARD_VALIDATOR, transactionController.makeTransaction);
router.get("/", transactionController.getTransactions);

export default router;