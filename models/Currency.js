import mongoose from "mongoose";

const RateSchema = new mongoose.Schema({
    ticker: String,
    value: Number
}, {_id: false})

const CurrencySchema = new mongoose.Schema(
    {
        type: {type: String, required: true, enum: ["fiat", "crypto", "stock"], default: "fiat"},
        ticker: {type: String, required: true},
        name: {type: String, required: true},
        coin_id: {type: String},
        symbol: {type: String},
        primary: {type: Boolean},
        symbolPosition: {type: String},
        rates: [
            RateSchema
        ]
    }
);

export default mongoose.model("Currency", CurrencySchema);
