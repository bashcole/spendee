import asyncHandler from "express-async-handler";
import Wallet from "../models/Wallet.js";
import Transaction from "../models/Transaction.js";
import mongoose from "mongoose";
import Position from "../models/Position.js";
import validated from "../utils/validated.js";
import logger from "../utils/logger.js";

// @desc    Fetch all wallets
// @route   GET /api/wallets
// @access  Public
export const index = asyncHandler(async (req, res) => {
    const wallets = await Wallet.find({
        userID: req.user._id,
    }).sort({sort: -1})
    res.json(wallets)
})


// @desc    Fetch all wallets
// @route   GET /api/wallets
// @access  Public
export const create = asyncHandler(async (req, res) => {

    // res.status(404)
    // throw new Error(`Wallet  not found`)
    //
    // console.log({
    //     userID: req.user._id,
    //     ...req.body
    // })
    const wallets = await Wallet.create({
        userID: req.user._id,
        ...req.body
    })
    res.json(wallets)
})

// @desc    Fetch single wallets
// @route   GET /api/wallets/:walletID
// @access  Public
export const show = asyncHandler(async (req, res) => {

    const data = validated(req, { locations: 'params' });

    try {

        const wallet = await Wallet.findById({
            _id: data.walletID,
            userID: req.user._id,
        })

        if (wallet) return res.json(wallet)

    } catch (e) {
        // logger.log('error', e.message)
        res.status(500)
        throw new Error('Something Went Wrong')
    }

    res.status(404)
    throw new Error(`Wallet ${req.params.walletID} not found`)
})

// @desc    Update wallet
// @route   PATCH /api/wallets/:walletID
// @access  Private
export const update = asyncHandler(async (req, res) => {

    const r = await Wallet.updateOne({
        _id: req.params.walletID
    }, req.body)


    return res.json(r)


    // res.status(404)
    // throw new Error(`Wallet ${req.params.walletID} not found`)
})

export const destroy = asyncHandler(async (req, res) => {

    try {
        await Wallet.deleteOne({_id: req.params.walletID, userID: req.user._id});
        await Transaction.deleteMany({walletID: req.params.walletID, userID: req.user._id});
        await Position.deleteMany({walletID: req.params.walletID, userID: req.user._id});
        res.json('OK')
    } catch (e) {
        res.status(404)
        throw new Error(`Wallet faild to delete`)
    }

})


// @desc    Fetch wallet transactions
// @route   GET /api/wallets/:walletID/transactions
// @access  Private
export const transactions = asyncHandler(async (req, res) => {

    const filters = {
        userID: req.user._id,
        walletID: mongoose.Types.ObjectId(req.params.walletID)
    }

    if (req.query.from && req.query.to) {
        filters.createdAt = {
            $gte: new Date(`${req.query.from}T00:00:00Z`),
            $lte: new Date(`${req.query.to}T23:59:59Z`)
        }
    }

    const transactions = await Transaction.find(filters).sort({createdAt: -1})

    if (transactions) {
        return res.json(transactions)
    }

    res.status(404)
    throw new Error('Transactions not found')
})

// @desc    Fetch wallet positions
// @route   GET /api/wallets/:walletID/positions
// @access  Private
export const positions = asyncHandler(async (req, res) => {

    const filters = {
        userID: req.user._id,
        walletID: mongoose.Types.ObjectId(req.params.walletID)
    }

    if (req.query.from && req.query.to) {
        filters.createdAt = {
            $gte: new Date(`${req.query.from}T00:00:00Z`),
            $lte: new Date(`${req.query.to}T23:59:59Z`)
        }
    }

    const positions = await Position.find(filters).sort({createdAt: -1})

    if (positions) {
        return res.json(positions)
    }

    res.status(404)
    throw new Error('Positions not found')
})

export default {
    index,
    create,
    show,
    update,
    destroy,
    transactions,
    positions,
}