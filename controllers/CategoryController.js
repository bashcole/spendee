import asyncHandler from "express-async-handler";
import Category from "../models/Category.js";

// @desc    Fetch all categories
// @route   GET /api/categories
// @access  Private
export const index = asyncHandler(async (req, res) => {
    console.log(req.user)
    const categories = await Category.find({
        userID: req.user._id,
    }).sort({'sort': 1})
    res.json(categories)
})

export default {
    index
}