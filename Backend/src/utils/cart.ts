import mongoose from "mongoose";
import toDecimal from "./toDecimal";

export default async function calculateCart(cart: any) {
    try {
        const count = cart.items.reduce((acc: number, item: { quantity: number }) => acc + item.quantity, 0);
        let subtotal = cart.items.reduce((acc: number, item: { total: mongoose.Types.Decimal128, quantity: number }) => acc + item.quantity * parseFloat(item.total.toString()), 0);

        let percentage = cart.percentage | 0;
        let discount: number | mongoose.Types.Decimal128 = (subtotal * percentage) / 100;
        let total: number | mongoose.Types.Decimal128 = subtotal - discount;

        subtotal = toDecimal(parseFloat(subtotal.toFixed(2)));
        discount = toDecimal(parseFloat(discount.toFixed(2)));
        total = toDecimal(parseFloat(total.toFixed(2)));

        cart.count = count;
        cart.subtotal = subtotal;
        cart.discount = discount;
        cart.total = total;
    }
    catch(err) {
        console.log(err);
    }
}