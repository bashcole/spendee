import User from "../models/User.js";
import Wallet from "../models/Wallet.js";
import Currency from "../models/Currency.js";

export const CreateTestUser = async (data = {
    name: "Mocha",
    username: "chai",
    email: "mocha@chai.com",
    password: "123456",
    picture: "https://example.com"
}) => {
    return await User.create(data)
}

export const CreateTestWallet = async (user, balance = 0) => {
    return await Wallet.create({
        userID: user._id,
        name: "Wallet",
        balance: balance,
        currency: "BGN",
    })
}

export const CreateTestCurrency = async (data) => {
    return await Currency.create(
        data
    )
}

export const CreateTestWalletOther = async (user, balance = 0, otherBalance = 0, currency = "USD") => {
    return await Wallet.create({
        userID: user._id,
        name: "Wallet",
        balance: balance,
        currency: currency,
        otherCurrency: {
            balance: otherBalance,
            currency: "BGN"
        }
    })
}