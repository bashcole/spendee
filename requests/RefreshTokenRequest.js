import { header } from "express-validator"
import {validationHelper} from "../utils/validate_request_helper.js";

export default [
    header('refresh_token').isLength({min: 6}).withMessage('Missing refresh_token'),
    (req, res, next) => {

        return validationHelper(req, res, next)
    }
]