import {check} from "express-validator"
import {validationHelper} from "../utils/validate_request_helper.js";

export default [
    check('name')
        .notEmpty().withMessage("The name should not be empty").bail()
        .isLength({min: 8}).withMessage('The name must be at least 8 characters'),
    check('username')
        .notEmpty().withMessage("The username should not be empty").bail()
        .isLength({min: 4}).withMessage('The username must be at least 4 characters'),
    check('email')
        .notEmpty().withMessage("The email should not be empty").bail()
        .isEmail().withMessage('Enter a valid email address'),
    check('password')
        .notEmpty().withMessage("the confirm password should not be empty").bail()
        .isLength({min: 8}).withMessage('The password must be at least 8 characters'),
    check("confirm_password")
        .notEmpty().withMessage("The confirm password should not be empty").bail()
        .isLength({min: 8}).withMessage('The confirm password must be at least 8 characters')
        .custom((value, {req}) => {
            if (value !== req.body.password) {
                throw new Error('Password confirmation does not match with password')
            }
            return true;
        }),
    check('picture')
        .notEmpty().withMessage("The picture should not be empty").bail(),
    (req, res, next) => {

        return validationHelper(req, res, next)
    }
]