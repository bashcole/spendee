import {body, check} from "express-validator"
import {validationHelper} from "../utils/validate_request_helper.js";

export default [
    body('email')
        .not()
        .isEmpty()
        .withMessage("Email can't be empty")
        .bail()
        .isEmail()
        .withMessage('Email must be a valid!')
        .bail(),
    body('password')
        .not()
        .isEmpty()
        .withMessage("Password can't be empty")
        .bail()
        .isLength({min: 5})
        .withMessage('Password must contain min 5 characters!')
    , (req, res, next) => {
        return validationHelper(req, res, next)
    }
]