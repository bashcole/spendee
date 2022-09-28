import mongoose from "mongoose";

const OtherCurrencySchema = new mongoose.Schema({
    amount: {
        type: Number
    },
    currency: {
        type: String
    },
    rate: {
        type: Number
    }
}, {_id: false})

const TransactionSchema = new mongoose.Schema(
    {
        amount: {type: Number, required: true},
        note: {type: String, default: ""},
        currency: {type: String, default: "BGN", required: true},
        userID: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
        walletID: {type: mongoose.Schema.Types.ObjectId, ref: "Wallet", required: true},
        createdAt: {type: Date, required: true},
        category: {
            id: {
                type: mongoose.Schema.Types.ObjectId, ref: "Category",
                required: true
            },
            type: {
                type: String,
                default: "credit"
            },
            name: {
                type: String,
                required: true
            },
            hex: {
                type: String,
                required: true
            },
            icon: {
                type: String,
                required: true
            },
        },
        otherCurrency: {
            type: OtherCurrencySchema
        }
    }
);

export default mongoose.model("Transaction", TransactionSchema);
