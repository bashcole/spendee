import mongoose from "mongoose";

const AmountSchema = new mongoose.Schema({
    value: {
        type: Number
    },
    currency: {
        type: String
    }
}, {_id: false})

const PositionSchema = new mongoose.Schema(
    {
        units: {type: Number, required: true},
        open: {type: Number, required: true},
        note: {type: String, default: ""},
        currency: {type: String, required: true},
        userID: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
        walletID: {type: mongoose.Schema.Types.ObjectId, ref: "Wallet", required: true},
        createdAt: {type: Date, required: true},
        amount: {
            type: AmountSchema
        },
        otherAmount: {
            type: AmountSchema
        }
    }
);

export default mongoose.model("Position", PositionSchema);
