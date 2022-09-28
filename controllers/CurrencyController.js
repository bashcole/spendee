import asyncHandler from "express-async-handler";
import Currency from "../models/Currency.js";

// @desc    Fetch all currencies
// @route   GET /api/currencies
// @access  Private
export const index = asyncHandler(async (req, res) => {

    const filters = ["type", "primary"]
    const where = {}

    for (const filter of filters) {
        if(req.query[filter]){
            where[filter] = req.query[filter]
        }
    }

    const currencies = await Currency.find(where, '-rates')
    res.json(currencies)
})

export default {
    index
}