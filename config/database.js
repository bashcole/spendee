import mongoose from 'mongoose';
import colors from "colors";

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${connect.connection.host}`.cyan.underline)

    } catch (e) {
        console.error(`Error: ${e}`.red.underline.bold)
    }
}

export default connectDB