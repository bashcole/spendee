import asyncHandler from "express-async-handler";
import Transaction from "../models/Transaction.js";
import mongoose from "mongoose";
import transactionService from "../services/transaction.js";
import validated from "../utils/validated.js";
import {formatDollarsToCents} from "../utils/utils.js";

// @desc    Fetch all user transactions
// @route   GET /api/transactions
// @access  Private
export const index = asyncHandler(async (req, res) => {
    const transactions = await transactionService.index(req.user, req.query)
    res.json(transactions)
})

// @desc    Fetch all transactions
// @route   GET /api/transactions/create
// @access  Private
export const store = asyncHandler(async (req, res) => {
    const bodyData = validated(req, { locations: ['body'] });
    bodyData.amount = formatDollarsToCents(bodyData.amount)
    console.log(bodyData)
    if(bodyData?.otherCurrency){
        console.log(bodyData)
        bodyData['otherCurrency']['amount'] = bodyData.amount * bodyData['otherCurrency']['rate']
    }
    const transaction = await transactionService.store(req.user, bodyData)
    res.json(transaction)
})


// @desc    Fetch single transaction
// @route   GET /api/transactions/:transactionID
// @access  Public
export const show = asyncHandler(async (req, res) => {

    try {
        const transaction = await Transaction.findById({
            _id: mongoose.Types.ObjectId(req.params.transactionID),
            userID: mongoose.Types.ObjectId(req.user._id),
        })

        if (transaction) return res.json(transaction)

    } catch (e) {
        // logger.log('error', e.message)
        res.status(500)
        throw new Error('Something Went Wrong')
    }

    res.status(404)
    throw new Error(`Transaction ${req.params.transactionID} not found`)
})


// @desc    Update single transaction
// @route   PUT /api/transactions/:transactionID
// @access  Public
export const update = asyncHandler(async (req, res) => {

    const bodyData = validated(req, { locations: ['body'] });
    bodyData.amount = formatDollarsToCents(bodyData.amount)
    if(bodyData?.otherCurrency){
        bodyData['otherCurrency']['amount'] = bodyData.amount * bodyData['otherCurrency']['rate']
    }

    const transaction = await transactionService.update(req.params.transactionID, req.user._id, bodyData)

    if(transaction){
        return res.json(transaction)
    }

    res.status(400)
    throw new Error(`Transaction ${req.params.transactionID} not found`)
})

// @desc    Delete single transaction
// @route   DELETE /api/transactions/:transactionID
// @access  Private
export const destroy = asyncHandler(async (req, res) => {
    try {
        await transactionService.destroy(req.params.transactionID, req.user)
        res.json({code: 200, message: 'Successfully deleted transaction'})
    } catch (e) {
        res.status(400)
        throw new Error(e.message)
    }

})

export default {
    index,
    store,
    show,
    update,
    destroy
}