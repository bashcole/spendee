import asyncHandler from "express-async-handler";
import Wallet from "../models/Wallet.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import Category from "../models/Category.js";
import {defaultCategories} from "../utils/utils.js";
import Currency from "../models/Currency.js";

// @desc    Create a new access token using the refresh token
// @route   POST /api/token/refresh
// @access  Public
const reset = asyncHandler(async (req, res) => {

    try {

        await User.deleteMany({})
        await Wallet.deleteMany({})
        await Transaction.deleteMany({})
        await Category.deleteMany({})
        await Currency.deleteMany({})

        const user = await User.create({
            name: "John Doe",
            username: "sandbox",
            email: "example@gmail.com",
            password: "123456",
            picture: "http://localhost:3000/img/avatars/JD.png"
        })

        const wallets = await Wallet.insertMany([
            {
                userID: user._id,
                name: "USD Wallet",
                balance: 1020,
                currency: 'USD',
                type: 'cash',
                otherCurrency: {
                    balance: 2040,
                    currency: 'BGN'
                },
            },
            {
                userID: user._id,
                name: "Wallet",
                balance: 1020,
                currency: 'BGN',
                type: 'cash'
            }
        ])

        await Category.insertMany(defaultCategories(user._id))

        await Currency.insertMany([
            {
                "type": "fiat",
                "ticker": "USD",
                "name": "United States dollar",
                "symbol": "$",
                "symbolPosition": "left",
                "rates": [
                    {
                        "ticker": "USD",
                        "value": 1
                    },
                    {
                        "ticker": "BGN",
                        "value": 1.92462
                    },
                ],
                "__v": 0,
                "primary": true
            },
            {
                "type": "fiat",
                "ticker": "BGN",
                "name": "Bulgarian lev",
                "symbol": "лв",
                "symbolPosition": "right",
                "rates": [
                    {
                        "ticker": "USD",
                        "value": 0.510506
                    },
                    {
                        "ticker": "BGN",
                        "value": 1
                    },
                ],
                "__v": 0,
                "primary": true
            }
        ])

        await Transaction.insertMany([
            {
                "amount": 1020,
                "note": "",
                "currency": "USD",
                userID: user._id,
                "walletID": wallets[0]["_id"],
                "createdAt": "2016-09-08T16:13:58.000Z",
                "category": {
                    "type": "expense",
                    "name": "Храна",
                    "id": "6273a1b7e6330d4afc010683",
                    "hex": "#b47b55",
                    "icon": "/img/icons/grocery.svg"
                },
                "otherCurrency": {
                    "currency": "BGN",
                    "amount": 2040,
                    "rate": 2
                }
            },
            {
                "amount": 1020,
                "note": "",
                "currency": "BGN",
                userID: user._id,
                "walletID": wallets[1]["_id"],
                "createdAt": "2016-09-08T16:13:58.000Z",
                "category": {
                    "type": "expense",
                    "name": "Храна",
                    "id": "6273a1b7e6330d4afc010683",
                    "hex": "#b47b55",
                    "icon": "/img/icons/grocery.svg"
                }
            },
        ])

        res.json({code: 200, message: 'Successfully seed the database'})

    } catch (e) {
        res.json({
            "message": e.message
        })
    }

})

export default {
    reset
}