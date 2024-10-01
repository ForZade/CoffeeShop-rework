import { Request, Response, NextFunction } from "express";
import User, { UserInterface } from "../models/userModel"
import Transaction, { TransactionInterface } from "../models/transactionModel";
import { verifyToken, TokenInterface } from "../utils/token";
import generateTransactionId from "../utils/idgen";
import { fakeTransaction } from "../utils/fakeTransaction";

const transactionsController = {
    makeTransaction: async (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies.jwt;
        try {
            const decoded: TokenInterface = await verifyToken(token!);

            const user: UserInterface = await User.findOne({ id: decoded.id });
            const id = generateTransactionId();

            if (!user) {
                return res.status(404).json({
                    message: "User not found",
                })
                }

            const newTransaction: TransactionInterface = new Transaction({
                id,
                user_id: user.id,
                order_details: user.cart,
            });

            if (await fakeTransaction(newTransaction)) {  /* Reikia dar padaryt kad darant pirkima paimam kortos duomenis*/
                user.cart = [];
                user.save();
                newTransaction.save();

                return res.status(201).json({
                    message: "Transaction successful",
                    newTransaction,
                })
            }
            else {
                return res.status(400).json({
                    message: "Transaction failed",
                    reason: "Insuffiecient funds",
                })
            }
        } catch (err) {
            next(err);
        }
    },
    getTransactions: async (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies.jwt;
        try {
            const decoded: TokenInterface = await verifyToken(token!);
            const transaction: TransactionInterface = await Transaction.findOne({ id: decoded.id });
            
            if (!transaction) {
                return res.status(404).json({
                    message: "No purchases made",
                })
            };

            res.status(200).json({
                message: "Transactions retrieved successfully",
                transactions: transaction
            });
        } catch (err) {
            next(err);
        };
    }
}

export default transactionsController