import asyncHandler from "express-async-handler";
import {generateAccessToken} from "../utils/generateTokens.js";
import validated from "../utils/validated.js";
import RefreshToken from "../models/RefreshToken.js";
import {REFRESH_TOKEN_INVALID} from "../config/error_codes.js";
import jwt from "jsonwebtoken";

const validateToken = asyncHandler(async (req, res) => {
    const token = "token"
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return res.status(200).json({
        status: "OK"
    });
})

// @desc    Create a new access token using the refresh token
// @route   POST /api/token/refresh
// @access  Public
const generateToken = asyncHandler(async (req, res) => {
    const {refresh_token} = validated(req)

    try {
        const findToken = await RefreshToken.findById(refresh_token)
        if (findToken) {
            if (findToken.isActive) {
                return res.json({
                    token: generateAccessToken(findToken.userID)
                })
            }
        }

        return res.status(400).json({
            error: {
                errors: [
                    {
                        "message": "Refresh token is invalid",
                        "error_code": REFRESH_TOKEN_INVALID
                    }
                ]
            },
            code: 400
        });
    } catch (e) {
        return res.status(400).json({
            error: {
                errors: [
                    {
                        "message": "Something went wrong"
                    }
                ]
            }
        });
    }

})

export default {
    generateToken,
    validateToken
}