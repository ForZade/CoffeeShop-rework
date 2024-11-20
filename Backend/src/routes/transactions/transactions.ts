import express from "express";
import transactionController from "../../controllers/transactionsController";
import { CARD_VALIDATOR } from "../../validations/cardValidator";

import "./transactions.docs";
import requireAuth from "../../middlewares/authMiddleware";

const router = express.Router();

router.post("/purchase", CARD_VALIDATOR, requireAuth, transactionController.makeTransaction);
router.get("/transactions/:id", requireAuth, transactionController.getTransaction);
router.get("/transactions", requireAuth, transactionController.getTransactions);

export default router;
