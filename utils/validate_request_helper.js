import {validationResult} from "express-validator";

export const validationHelper = (req, res, next) => {
    const errorFormatter = ({location, msg, param, value, nestedErrors}) => {
        // Build your resulting errors however you want! String, object, whatever - it works!
        return {
            "message": msg,
            param,
            value
        };
    };

    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: {
                errors: errors.array()
            },
            code: 400
        });
    }

    next()
}