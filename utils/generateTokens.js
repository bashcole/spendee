import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid';

export const generateAccessToken = (userID) => {
    return jwt.sign({userID}, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
}

export const generateRefreshToken = () => {
    return uuidv4()
}