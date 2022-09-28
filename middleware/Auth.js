import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "express-async-handler";

const auth = asyncHandler(async (req, res, next) => {
    const authorization = req.headers.authorization

    if(authorization && authorization.startsWith('Bearer')){

        try {

            const token = authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const userID = decoded.userID
            const user = await User.findById(userID).select('-password')
            if(user){
                req.user = user
                return next()
            }

        } catch (e) {
            console.log(e)
        }

    }

    res.status(401);
    throw new Error('Not authorized')
})

export default auth