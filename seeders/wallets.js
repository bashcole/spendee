import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import wallets from "./data/wallets.js";
import Wallet from '../models/Wallet.js'
import connectDB from "../config/database.js";

dotenv.config()

if(process.env.NODE_ENV !== 'development'){
    console.log(`Environment is not development`.red.inverse)
    process.exit(1)
}

connectDB().then(r => console.log(r))

const importData = async() => {

    try {
        await Wallet.insertMany(wallets)
        console.log('Wallets Data imported'.green.inverse)
        process.exit()
    } catch (e) {
        console.log(`${e}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async() => {
    try {
        await Wallet.deleteMany()
        console.log('Wallets Data deleted'.green.inverse)
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