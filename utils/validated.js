import {matchedData} from "express-validator";

export default (req, options = {
    includeOptionals: true,
    onlyValidData: true}) => {
    return matchedData(req, options);
}