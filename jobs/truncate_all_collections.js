import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "../config/database.js";
import RefreshToken from "../models/RefreshToken.js";
import User from "../models/User.js";
import Icon from "../models/Icon.js";
import Category from "../models/Category.js";
import Color from "../models/Color.js";
import Position from "../models/Position.js";
import Transaction from "../models/Transaction.js";
import Wallet from "../models/Wallet.js";
import Currency from "../models/Currency.js";

dotenv.config()

if(process.env.NODE_ENV !== 'development'){
    console.log(`Environment is not development`.red.inverse)
    process.exit(1)
}

connectDB().then(r => console.log(r))

const execute = async() => {
    try {
        await Currency.deleteMany()
        await Category.deleteMany()
        await Color.deleteMany()
        await Position.deleteMany()
        await Transaction.deleteMany()
        await Wallet.deleteMany()
        await RefreshToken.deleteMany()
        await Icon.deleteMany()
        await User.deleteMany()
        console.log('Data deleted'.green.inverse)
        process.exit()
    } catch (e) {
        console.log(`${e}`.red.inverse)
        process.exit(1)
    }
}

execute().then();