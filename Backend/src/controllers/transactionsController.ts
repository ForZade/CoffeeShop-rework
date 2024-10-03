import { Request, Response, NextFunction } from "express";
import User, { UserInterface } from "../models/userModel";
import Transaction, { TransactionInterface } from "../models/transactionModel";
import { verifyToken, TokenInterface } from "../utils/token";
import generateTransactionId from "../utils/idgen";
import { fakeTransaction } from "../utils/fakeTransaction";
import toDecimal from "../utils/toDecimal";

// import transactionModel from "../models/transactionModel";

const transactionsController = {
  makeTransaction: async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;
    const { cvv } = req.body;
    console.log(cvv);

    try {
      const decoded: TokenInterface = await verifyToken(token);

      const user: UserInterface = await User.findOne({ id: decoded.id });
      const id = await generateTransactionId();

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const ifEmpty = user.cart.total === toDecimal(0) || !user.cart.total;

      if (ifEmpty) {
        return res.status(400).json({
          message: "Cart is empty",
        });
      }

      const newTransaction: TransactionInterface = new Transaction({
        id,
        user_id: user.id,
        order_details: user.cart.items,
        total: user.cart.total,
      });

      const ifFake = await fakeTransaction(user.cart.total);

      if (!ifFake) {
        return res.status(400).json({
          message: "Transaction failed",
          reason: "Insuffiecient funds",
        });
      }

      user.cart.items = [];
      user.cart.total = toDecimal(0);
      user.save();
      newTransaction.save();

      return res.status(201).json({
        message: "Transaction successful",
        newTransaction,
      });
    } catch (err) {
      next(err);
    }
  },
  getTransactions: async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;
    try {
      const decoded: TokenInterface = await verifyToken(token!);
      const transaction = await Transaction.find({
        user_id: decoded.id,
      }).lean();

      if (!transaction) {
        return res.status(404).json({
          message: "No purchases made",
        });
      }

      res.status(200).json({
        message: "Transactions retrieved successfully",
        transactions: transaction,
      });
    } catch (err) {
      next(err);
    }
  },
};

export default transactionsController;
