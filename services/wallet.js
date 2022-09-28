import Wallet from "../models/Wallet.js";
import mongoose from "mongoose";

const index = async (user, filters) => {
    return Wallet.find({
        userID: user._id
    });

}

const store = async (data, userID) => {
    try {
        return await Wallet.create({
            userID: userID,
            ...data
        })
    } catch (e) {
        throw new Error(e.message)
    }

}

const update = async (walletID, userID, data) => {
    try {
        const wallet = await Wallet.findById({
            _id: mongoose.Types.ObjectId(walletID),
            userID: mongoose.Types.ObjectId(userID)
        })

        const result = await Wallet.updateOne({_id: wallet._id}, {
            name: data.name
        })
    } catch (e) {
        throw new Error(e.message)
    }
}

export default {
    index,
    store,
    update
}