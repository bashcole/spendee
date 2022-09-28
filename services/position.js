import Transaction from "../models/Transaction.js";
import mongoose from "mongoose";
import Wallet from "../models/Wallet.js";
import currency from "../models/Currency.js";
import Currency from "../models/Currency.js";
import logger from "../utils/logger.js";
import Position from "../models/Position.js";
import {formatDollarsToCents} from "../utils/utils.js";

const destroy = async (positionID, user) => {

    try {
        const position = await Position.findById({
            _id: mongoose.Types.ObjectId(positionID),
            userID: mongoose.Types.ObjectId(user._id),
        })


        let walletUpdate = {
            "$inc": {
                "balance": -position.amount.value,
                "otherCurrency.balance": -position.otherAmount.value
            }
        }

        const walletResult = await Wallet.updateOne({
            _id: position.walletID
        }, walletUpdate)
        console.log(walletResult)
        console.log(walletUpdate)
        return Position.deleteOne({_id: positionID, userID: user._id});
    } catch (e) {
        console.log(e.message)
        throw new Error('Error while deleting transaction')
    }

}

const index = async (user, query) => {

    const filters = {
        userID: user._id
    }

    if (query.from && query.to) {
        filters.createdAt = {
            $gte: new Date("2022-05-01"),
            $lt: new Date("2022-05-10")
        }
    }

    try {
        return Position.find(filters).sort({createdAt: -1});
    } catch (e) {
        throw new Error(e.message)
    }
}

const store = async (user, data) => {
    try {

        const walletID = mongoose.Types.ObjectId(data.walletID)
        // const positionWallet = await Wallet.findById(walletID)

        let postData = data;
        //
        // const wallet = positionWallet.toObject()
        // if (wallet.hasOwnProperty('otherCurrency')) {
        //     // logger.log('error',JSON.stringify(data))
        //     // logger.log('error',JSON.stringify(transactionWallet))
        //     const currency = await Currency.findOne({ticker: positionWallet.currency});
        //     logger.log('error',JSON.stringify(currency.rates))
        //     const {value: rate} = currency.rates.filter(r => r.ticker === transactionWallet.otherCurrency.currency)[0]
        //     postData = {
        //         ...data,
        //         otherCurrency: {
        //             currency: "BGN",
        //             rate: rate,
        //             amount: data.amount * rate
        //         }
        //     }
        // }

        console.log(data)
        const currency = await Currency.findOne({ticker: data.currency})
        // console.log(currency)
        const usdRate = currency.rates.filter(rate => rate.ticker === "USD").pop()
        const bgnRate = currency.rates.filter(rate => rate.ticker === "BGN").pop()
        // console.log(usdRate)
        console.log(`${usdRate.value} * 100 * ${postData.units}`)
        const position = await Position.create({
            userID: user._id,
            walletID,
            ...postData,
            amount: {
                value: formatDollarsToCents(usdRate.value * postData.units),
                currency: "USD",
            },
            otherAmount: {
                value: formatDollarsToCents(bgnRate.value * postData.units),
                currency: "BGN",
            }
        })

        const walletUpdate = {
            $inc: {
                balance: formatDollarsToCents(usdRate.value * postData.units),
                "otherCurrency.balance": formatDollarsToCents(bgnRate.value * postData.units)
            }
        }
        await Wallet.updateOne({_id: walletID}, walletUpdate)

        return position
    } catch (e) {
        throw new Error(e.message)
    }
}

const update = async (positionID, user, data) => {
    try {

        const position = await Position.findById({
            _id: mongoose.Types.ObjectId(positionID),
            userID: mongoose.Types.ObjectId(user._id),
        })

        if (position) {

            const currency = await Currency.findOne({ticker: data.currency})
            console.log(currency)
            const usdRate = currency.rates.filter(rate => rate.ticker === "USD").pop()
            const bgnRate = currency.rates.filter(rate => rate.ticker === "BGN").pop()

            const update = {
                createdAt: data.createdAt,
                units: data.units,
                open: data.open,
                currency: data.currency,
                amount: {
                    value: formatDollarsToCents(usdRate.value * data.units),
                    currency: "USD"
                },
                otherAmount: {
                    value: formatDollarsToCents(bgnRate.value * data.units),
                    currency: "BGN"
                }
            }
            //
            // const calculateAmountChange = (prev, current) => {
            //     if (prev.category.type === "expense") {
            //
            //         if (current.category.type === "expense") {
            //             return prev.amount - current.amount
            //         }
            //         return prev.amount + current.amount
            //     }
            //
            //     if (prev.category.type === "income") {
            //         if (current.category.type === "expense") {
            //             return -(current.amount + prev.amount)
            //         }
            //
            //         return current.amount - prev.amount
            //     }
            // }

            // let balance = calculateAmountChange(position, update)
            //
            let walletUpdate = {
                "$inc": {
                    "balance": formatDollarsToCents(usdRate.value * data.units) - position.amount.value,
                    "otherCurrency.balance": formatDollarsToCents(bgnRate.value * data.units) - position.otherAmount.value
                }
            }

            // const transactionObject = position.toObject()
            // if (transactionObject.hasOwnProperty('otherCurrency')) {
            //     update.otherCurrency = position.otherCurrency;
            //     update.otherCurrency.amount = data.amount * transaction.otherCurrency.rate
            //     walletUpdate["$inc"]["otherCurrency.balance"] = balance * transaction.otherCurrency.rate
            // }

            console.log(update)
            const result = await Position.updateOne({_id: position._id}, update)

            const walletResult = await Wallet.updateOne({
                _id: position.walletID
            }, walletUpdate)

            return result

        }

    } catch (e) {
        throw new Error(e.message)
    }
}

export default {
    index,
    destroy,
    store,
    update
}