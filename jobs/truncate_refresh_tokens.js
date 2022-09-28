import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "../config/database.js";
import RefreshToken from "../models/RefreshToken.js";

dotenv.config()

if(process.env.NODE_ENV !== 'development'){
    console.log(`Environment is not development`.red.inverse)
    process.exit(1)
}

connectDB().then(r => console.log(r))

const execute = async() => {
    try {
        await RefreshToken.deleteMany()
        console.log('Refresh Tokens Data deleted'.green.inverse)
        process.exit()
    } catch (e) {
        console.log(`${e}`.red.inverse)
        process.exit(1)
    }
}

execute().then();