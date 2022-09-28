import {check} from "express-validator"
import {validationHelper} from "../utils/validate_request_helper.js";

export default [
    check('amount').isNumeric(),
    check('note').exists().bail().isString(),
    check('category').exists(),
    check('category.id').exists(),
    check('category.type').exists(),
    check('category.name').exists(),
    check('category.hex').exists(),
    check('category.icon').exists(),
    check('currency').notEmpty().bail().isString(),
    check('walletID').notEmpty().bail().isString(),
    check('createdAt').notEmpty().bail().isString(),
    check('otherCurrency').optional().custom((value, {req}) => {
        if (req.body.otherCurrency === undefined) {
            return true;
        }
        if (!req.body.otherCurrency?.currency) {
            throw new Error('Invalid value')
        }
        return true;
    }),
    (req, res, next) => {

        return validationHelper(req, res, next)
    }
]