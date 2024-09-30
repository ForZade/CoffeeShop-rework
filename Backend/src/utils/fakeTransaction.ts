import { TransactionInterface } from "../models/transactionModel";
import { cardDataInterface } from "../models/transactionModel";

function getRandomNumber(min: number = 1, max: number = 99999, decimals: number = 2): number {
    const random = Math.random() * (max - min) + min;
    return parseFloat(random.toFixed(decimals));
}

export async function fakeTransaction(
    newTransaction: TransactionInterface,
    cardData: cardDataInterface) {
    const currentAmount = getRandomNumber();
    return currentAmount > newTransaction.order_details[0].total ? true : false
}