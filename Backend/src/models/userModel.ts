import mongoose from "mongoose";
import { cartItemSchema, cartInterface } from "./cartModel";

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    wallet: {
        type: Number,
        default: 0
    },
    cart: [
        cartItemSchema
    ]
});

export default mongoose.model("User", userSchema);

export interface UserInterface {
    _id: number,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    isVerified: boolean,
    admin: boolean,
    created_at: Date,
    wallet?: number,
    cart?: cartInterface
}