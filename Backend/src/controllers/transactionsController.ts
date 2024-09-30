import { Request, Response, NextFunction } from "express";
import User, { UserInterface } from "../models/userModel"
import Transaction, { TransactionInterface } from "../models/transactionModel";
import { verifyToken, TokenInterface } from "../utils/token";
import generateTransactionId from "../utils/idgen";
import { fakeTransaction } from "../utils/fakeTransaction";

const transactionsController = {
    makeTransaction: async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];

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

            if(await fakeTransaction(newTransaction, req.body.cardData)) {  /* Reikia dar padaryt kad darant pirkima paimam kortos duomenis*/
                user.cart = [];
                user.save();
                newTransaction.save();
                
                return res.status(201).json({
                    message: "Transaction successful",
                    newTransaction,
                })
            }
            else{
                return res.status(400).json({
                    message: "Transaction faileds",
                    reason: "Insuffiecient funds",
                })
            }

            res.status(201).json({
                message: "Transaction successful",
                newTransaction,
            })
        } catch (err) {
            next(err);
        }
    }
}

export default transactionsController