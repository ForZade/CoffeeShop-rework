import { TransactionInterface } from "../models/transactionModel";

function getRandomNumber(min: number = 1, max: number = 1500, decimals: number = 2): number {
    const random = Math.random() * (max - min) + min;
    return parseFloat(random.toFixed(decimals));
}

export async function fakeTransaction(total: number): Promise<boolean> {
    const currentAmount = getRandomNumber(); // 1 - 999999
    console.log(currentAmount, total);
    return currentAmount > total ? true : false
}