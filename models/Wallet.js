import mongoose from "mongoose";

const OtherCurrencySchema = new mongoose.Schema({
	balance: {
		type: Number
	},
	currency: {
		type: String
	}
}, {_id: false})

const WalletSchema = new mongoose.Schema({
	userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	name: {type: String, required: true},
	balance: {type: Number, required: true, default: 0},
	currency: {type: String, required: true},
	type: {
		type: String,
		enum: ["cash", "portfolio"],
		default: "cash"
	},
	otherCurrency: {
		type: OtherCurrencySchema
	}
})

export default mongoose.model("Wallet", WalletSchema);