import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import transactions from "./data/transactions.js";
import Transaction from '../models/Transaction.js'
import connectDB from "../config/database.js";

dotenv.config()

if(process.env.NODE_ENV !== 'development'){
    console.log(`Environment is not development`.red.inverse)
    process.exit(1)
}

connectDB().then(r => console.log(r))

const importData = async() => {

    try {
        await Transaction.insertMany(transactions)
        console.log('Transactions Data imported'.green.inverse)
        process.exit()
    } catch (e) {
        console.log(`${e}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async() => {
    try {
        await Transaction.deleteMany()
        console.log('Transactions Data deleted'.green.inverse)
        process.exit()
    } catch (e) {
        console.log(`${e}`.red.inverse)
        process.exit(1)
    }
}

if(process.argv[2] === '-d') {
    destroyData().then();
} else {
    importData().then();
}