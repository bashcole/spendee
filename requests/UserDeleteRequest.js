import {param} from "express-validator"
import {validationHelper} from "../utils/validate_request_helper.js";

export default [
    param('userID').trim()
        .escape()
        .isLength({ min: 20 })
        .withMessage('Minimum 20 characters required!')
        .bail(),
    (req, res, next) => {
        return validationHelper(req, res, next)
    }
]