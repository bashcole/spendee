import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import Transaction from '../models/Transaction.js'
import Wallet from '../models/Wallet.js'
import connectDB from "../config/database.js";
import {MongoBinary} from "mongodb-memory-server";

dotenv.config()

if(process.env.NODE_ENV !== 'development'){
    console.log(`Environment is not development`.red.inverse)
    process.exit(1)
}

connectDB().then(r => console.log(r))

const execute = async() => {

    try {
        const wallets = await Wallet.find({type: "cash"})
        // console.log(wallets)
        for (const wallet of wallets) {

            const aggregate = await Transaction.aggregate([
                {
                    $match: {
                        walletID: mongoose.Types.ObjectId(wallet._id)
                    }
                },
                {
                    $group: {
                        _id: null,
                        "income": {
                            "$sum": {
                                "$cond": [
                                    {
                                        "$eq": [
                                            "$category.type",
                                            "income"
                                        ]
                                    },
                                    "$amount",
                                    0
                                ]
                            }
                        },
                        "expense": {
                            "$sum": {
                                "$cond": [
                                    {
                                        "$eq": [
                                            "$category.type",
                                            "expense"
                                        ]
                                    },
                                    "$amount",
                                    0
                                ]
                            }
                        },
                        "otherCurrencyIncome": {
                            "$sum": {
                                "$cond": [
                                    {
                                        "$eq": [
                                            "$category.type",
                                            "income"
                                        ]
                                    },
                                    "$otherCurrency.amount",
                                    0
                                ]
                            }
                        },
                        "otherCurrencyExpense": {
                            "$sum": {
                                "$cond": [
                                    {
                                        "$eq": [
                                            "$category.type",
                                            "expense"
                                        ]
                                    },
                                    "$otherCurrency.amount",
                                    0
                                ]
                            }
                        }
                    }
                },
                {
                    $project: {
                        income: 1, expense: 1, otherCurrencyIncome: 1, otherCurrencyExpense: 1, _id: 0,
                        balance: { $subtract: ["$income", "$expense"]},
                        otherCurrencyBalance: {$subtract: ["$otherCurrencyIncome", "$otherCurrencyExpense"]},
                    }
                }
            ])

            console.log(aggregate)
            let statistics = aggregate[0]
            if(aggregate.length === 0){
                // continue;
                statistics = {
                    balance: 0,
                    otherCurrencyBalance: 0
                }
            }

            let update = {
                balance: statistics.balance,
            }
            const walletObject = wallet.toObject();
            if(walletObject.hasOwnProperty("otherCurrency")){
                update = {...update, "otherCurrency.balance": statistics.otherCurrencyBalance}
            }
            const result = await Wallet.updateOne({_id: wallet._id}, update)

            console.log(wallet)
            console.log(update)
            // console.log(result)
        }

        console.log('Wallets Data imported'.green.inverse)
        process.exit()
    } catch (e) {
        console.log(`${e}`.red.inverse)
        process.exit(1)
    }
}

execute().then();
