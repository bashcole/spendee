import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import positions from "./data/positions.js";
import connectDB from "../config/database.js";
import Position from "../models/Position.js";

dotenv.config()

if(process.env.NODE_ENV !== 'development'){
    console.log(`Environment is not development`.red.inverse)
    process.exit(1)
}

connectDB().then(r => console.log(r))

const importData = async() => {

    try {
        await Position.insertMany(positions)
        console.log('Positions Data imported'.green.inverse)
        process.exit()
    } catch (e) {
        console.log(`${e}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async() => {
    try {
        await Position.deleteMany()
        console.log('Positions Data deleted'.green.inverse)
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