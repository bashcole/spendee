import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import positionService from "../services/position.js";
import validated from "../utils/validated.js";
import {formatDollarsToCents} from "../utils/utils.js";

// @desc    Fetch all user positions
// @route   GET /api/positions
// @access  Private
export const index = asyncHandler(async (req, res) => {
    const positions = await positionService.index(req.user, req.query)
    res.json(positions)
})

// @desc    Fetch all positions
// @route   GET /api/positions/create
// @access  Private
export const store = asyncHandler(async (req, res) => {
    const bodyData = validated(req, { locations: ['body'] });
    const position = await positionService.store(req.user, bodyData)
    res.json(position)
})


// @desc    Fetch single position
// @route   GET /api/positions/:positionID
// @access  Private
export const show = asyncHandler(async (req, res) => {
    const position = await Position.findById({
        _id: mongoose.Types.ObjectId(req.params.positionID),
        userID: mongoose.Types.ObjectId(req.user._id),
    })

    if (position) {
        return res.json(position)
    }

    res.status(404)
    throw new Error(`Transaction ${req.params.transactionID} not found`)
})


// @desc    Update single position
// @route   PUT /api/positions/:positionID
// @access  Public
export const update = asyncHandler(async (req, res) => {

    const bodyData = validated(req, { locations: ['body'] });
    bodyData.amount = formatDollarsToCents(bodyData.amount)
    if(bodyData.hasOwnProperty('otherCurrency')){
        bodyData['otherCurrency']['amount'] = bodyData.amount * bodyData['otherCurrency']['rate']
    }

    const position = await positionService.update(req.params.positionID, req.user._id, bodyData)

    if(position){
        return res.json(position)
    }

    res.status(400)
    throw new Error(`Position ${req.params.positionID} not found`)
})

// @desc    Delete single position
// @route   DELETE /api/positions/:positionID
// @access  Private
export const destroy = asyncHandler(async (req, res) => {
    try {
        await positionService.destroy(req.params.positionID, req.user)
        res.json({code: 200, message: 'Successfully deleted position'})
    } catch (e) {
        res.status(400)
        throw new Error(`Position fail to delete`)
    }

})

export default {
    index,
    store,
    show,
    update,
    destroy
}