import Transaction from "../models/Transaction.js";
import mongoose from "mongoose";
import Wallet from "../models/Wallet.js";
import currency from "../models/Currency.js";
import Currency from "../models/Currency.js";
import logger from "../utils/logger.js";
import {calculateAmountChange} from "../utils/utils.js";

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
        return Transaction.find(filters).sort({createdAt: -1});
    } catch (e) {
        throw new Error(e.message)
    }
}

const store = async (user, data) => {
    try {

        const walletID = mongoose.Types.ObjectId(data.walletID)
        const wallet = await Wallet.findById({
            _id: walletID
        })

        if (!wallet) return Promise.reject(Error(`Wallet not found`))

        if (data?.otherCurrency) {
            console.log(data)
            if(data?.otherCurrency.currency !== wallet?.otherCurrency.currency){
                return Promise.reject(Error(`Wallet currency miss match`))
            }
        }


        let postData = data;

        // const wallet = transactionWallet.toObject()
        if (data?.otherCurrency) {
            console.log('WTF')
            let rate = null

            if (data?.otherCurrency.rate) {
                rate = data?.otherCurrency.rate
            } else {
                const currency = await Currency.findOne({ticker: wallet.currency});
                logger.log('error', JSON.stringify(currency.rates))
                rate = currency.rates.filter(r => r.ticker === wallet.otherCurrency.currency)[0].value
            }

            if(rate === 0){
                return Promise.reject(Error(`The rate can't be empty`))
            }

            // logger.log('error',JSON.stringify(data))
            // logger.log('error',JSON.stringify(transactionWallet))

            postData = {
                ...data,
                otherCurrency: {
                    currency: wallet.otherCurrency.currency,
                    rate: rate,
                    amount: data.amount * rate
                }
            }
            console.log(postData)
        }

        const transaction = await Transaction.create({
            userID: user._id,
            walletID,
            ...postData
        })

        const walletUpdate = {
            $inc: {
                balance: data.category.type === "expense" ? -data.amount : data.amount
            }
        }

        if (transaction?.otherCurrency) {
            walletUpdate["$inc"]["otherCurrency.balance"] = data.category.type === "expense" ? -postData.otherCurrency.amount : postData.otherCurrency.amount
        }

        // console.log(walletUpdate)

        await Wallet.updateOne({_id: walletID}, walletUpdate)

        return transaction
    } catch (e) {
        throw new Error(e.message)
    }
}

const update = async (transactionID, user, data) => {
    try {

        const transaction = await Transaction.findById({
            _id: mongoose.Types.ObjectId(transactionID),
            userID: mongoose.Types.ObjectId(user._id),
        })

        if (!transaction) return Promise.reject(Error(`Transaction not found`))

        const wallet = await Wallet.findById({
            _id: mongoose.Types.ObjectId(data.walletID)
        })

        if (!wallet) return Promise.reject(Error(`Wallet not found`))

        if (data?.otherCurrency) {
            if(data?.otherCurrency.currency !== wallet?.otherCurrency.currency){
                return Promise.reject(Error(`Wallet currency miss match`))
            }
        }

        const update = {
            createdAt: data.createdAt,
            amount: data.amount,
            note: data.note,
            category: data.category
        }

        let balance = calculateAmountChange(transaction, update)

        let walletUpdate = {
            "$inc": {
                "balance": balance
            }
        }

        if (transaction?.otherCurrency) {
            logger.log('error', 'Does it has otherCurrency')
            update.otherCurrency = transaction.otherCurrency;
            update.otherCurrency.amount = data.amount * transaction.otherCurrency.rate
            walletUpdate["$inc"]["otherCurrency.balance"] = balance * transaction.otherCurrency.rate
        }

        const updatedTransation = await Transaction.findOneAndUpdate({_id: transaction._id}, update, {new: true})

        const walletResult = await Wallet.updateOne({
            _id: transaction.walletID
        }, walletUpdate)

        return updatedTransation

    } catch (e) {
        throw e
    }
}

const destroy = async (transactionID, user) => {

    try {
        const transaction = await Transaction.findById({
            _id: mongoose.Types.ObjectId(transactionID),
            userID: mongoose.Types.ObjectId(user._id),
        })

        if (!transaction) return Promise.reject(Error(`Transaction ${transactionID} not found`))

        let walletUpdate = {
            "$inc": {
                "balance": transaction.category.type === "expense" ? transaction.amount : -transaction.amount
            }
        }

        if (transaction?.otherCurrency) {
            walletUpdate["$inc"]["otherCurrency.balance"] = transaction.category.type === "expense" ? transaction.otherCurrency.amount : -transaction.otherCurrency.amount
        }

        const walletResult = await Wallet.updateOne({
            _id: transaction.walletID
        }, walletUpdate)
        return Transaction.deleteOne({_id: transactionID, userID: user._id});
    } catch (e) {
        throw e
    }

}

export default {
    index,
    store,
    update,
    destroy
}