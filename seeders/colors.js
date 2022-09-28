import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import colorsData from "./data/colors.js";
import Color from '../models/Color.js'
import connectDB from "../config/database.js";

dotenv.config()

if(process.env.NODE_ENV !== 'development'){
    console.log(`Environment is not development`.red.inverse)
    process.exit(1)
}

connectDB().then(r => console.log(r))

const importData = async() => {

    try {
        await Color.insertMany(colorsData)
        console.log('Colors Data imported'.green.inverse)
        process.exit()
    } catch (e) {
        console.log(`${e}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async() => {
    try {
        await Color.deleteMany()
        console.log('Colors Data deleted'.green.inverse)
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