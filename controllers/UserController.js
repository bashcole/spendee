import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import {generateAccessToken, generateRefreshToken} from "../utils/generateTokens.js";
import validated from "../utils/validated.js";
import RefreshToken from "../models/RefreshToken.js";
import {USER_ALREADY_EXIST} from "../config/error_codes.js";
import Category from "../models/Category.js";
import {defaultCategories} from "../utils/utils.js";
import Transaction from "../models/Transaction.js";
import Wallet from "../models/Wallet.js";
import Position from "../models/Position.js";

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
export const register = asyncHandler(async (req, res) => {
    const {email, password, username, name} = validated(req)

    try {

        const findUser = await User.findOne({
            $or: [
                {email: email},
                {username: username}
            ]
        })

        if (findUser) {
            return res.status(400).json({
                error: {
                    errors: [
                        {
                            "message": "User already exist",
                            "error_code": USER_ALREADY_EXIST
                        }
                    ]
                },
                code: 400
            });
        }

        const user = await User.create({
            email,
            password,
            name,
            username,
            picture: 'http://localhost:3000/img/avatars/JD.png'
        })

        // Generate categories
        await Category.insertMany(defaultCategories(user._id))

        const refreshToken = generateRefreshToken()
        await RefreshToken.create({
            _id: refreshToken,
            userID: user._id,
            expires: new Date(Date.now() + 60*60*24*1000),
            createdByIp: req.ip
        })

        return res.json({
            _id: user._id,
            email: user.email,
            username: user.username,
            name: user.name,
            picture: user.picture,
            token: generateAccessToken(user._id),
            refreshToken
        })

    } catch (e) {
        res.status(500)
        throw new Error('Something Went Wrong')
    }

})

export const destroy = asyncHandler(async (req, res) => {

    const data = validated(req, { locations: 'params' });

    if(req.user._id.toString() !== data.userID){
        res.status(401)
        throw new Error('Not authorized')
    }

    try {
        await User.deleteOne({_id: req.user._id})
        await Transaction.deleteMany({userID: req.user._id})
        await Wallet.deleteMany({userID: req.user._id})
        await Category.deleteMany({userID: req.user._id})
        await Position.deleteMany({userID: req.user._id})
        res.json({code: 200, message: 'Successfully deleted user'})
    } catch (e) {
        res.status(500)
        throw new Error('Something Went Wrong')
    }
})

// @desc    Auth the user & create access/refresh tokens
// @route   POST /api/users/auth
// @access  Public
export const login = asyncHandler(async (req, res) => {
    try {
        console.log(req.body)
        const {email, password} = req.body
        const user = await User.findOne({
            email
        })

        if (user && (await user.matchPassword(password))) {

            let refreshToken;
            let findRefreshToken = await RefreshToken.findOne({
                userID: user._id,
                expireAt: {
                    $gte: new Date()
                },
                revokedAt: null
            })

            if (findRefreshToken) {
                refreshToken = findRefreshToken._id
            } else {
                refreshToken = generateRefreshToken()
                await RefreshToken.create({
                    _id: refreshToken,
                    userID: user._id,
                    expires: new Date(Date.now() + 60*60*24*1000),
                    createdByIp: req.ip
                })
            }
            console.log({
                _id: user._id,
                email: user.email,
                username: user.username,
                picture: user.picture,
                name: user.name,
                token: generateAccessToken(user._id),
                refreshToken
            })
            return res.json({
                _id: user._id,
                email: user.email,
                username: user.username,
                picture: user.picture,
                name: user.name,
                token: generateAccessToken(user._id),
                refreshToken
            })

        }

        res.status(401)
        throw new Error('bla')
    } catch (e) {
        throw new Error('Invalid email or password')
    }
})

export default {
    login,
    register,
    destroy
}