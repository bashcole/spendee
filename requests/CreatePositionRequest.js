import {check} from "express-validator"
import {validationHelper} from "../utils/validate_request_helper.js";

export default [
    check('units').isNumeric(),
    check('open').isNumeric(),
    check('currency').notEmpty().bail().isString(),
    check('walletID').notEmpty().bail().isString(),
    check('createdAt').notEmpty().bail().isString(),
]