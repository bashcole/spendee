import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import Icon from '../models/Icon.js'
import icons from "./data/icons.js";
import connectDB from "../config/database.js";

dotenv.config()

console.log(process.env.FRONTEND_URL)

if(process.env.NODE_ENV !== 'development'){
    console.log(`Environment is not development`.red.inverse)
    process.exit(1)
}

connectDB().then(r => console.log(r))

const importData = async() => {

    try {
        await Icon.insertMany(icons)
        console.log('Icons Data imported'.green.inverse)
        process.exit()
    } catch (e) {
        console.log(`${e}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async() => {
    try {
        await Icon.deleteMany()
        console.log('Icons Data deleted'.green.inverse)
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