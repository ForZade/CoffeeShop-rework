import mongoose from "mongoose";
import toDecimal from "./toDecimal";
import User, { UserInterface } from "../models/userModel";

export default async function calculateCart(id: number) {
    try {
        const user: UserInterface = await User.findOne({
            id
        });

        const count = user.cart.items.reduce((acc: number, item: { quantity: number }) => acc + item.quantity, 0);
        let subtotal: number | mongoose.Types.Decimal128 = user.cart.items.reduce((acc: number, item: { total: mongoose.Types.Decimal128, quantity: number }) => acc + item.quantity * parseFloat(item.total.toString()), 0);

        let percentage = user.cart.percentage | 0;
        let discount: number | mongoose.Types.Decimal128 = (subtotal * percentage) / 100;
        let total: number | mongoose.Types.Decimal128 = subtotal - discount;

        subtotal = toDecimal(parseFloat(subtotal.toFixed(2)));
        discount = toDecimal(parseFloat(discount.toFixed(2)));
        total = toDecimal(parseFloat(total.toFixed(2)));

        user.cart.count = count;
        user.cart.subtotal = subtotal;
        user.cart.discount = discount;
        user.cart.total = total;

        await user.save();
    }
    catch(err) {
        console.log(err);
    }
}