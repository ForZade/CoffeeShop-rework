import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    order_details: [

    ],
    created_at: {
        type: Date,
        default: Date.now
    },
});

export default mongoose.model("Transaction", transactionSchema)