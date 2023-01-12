const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator")


const validatorGetItem = [
    check("id")
    .exists()
    .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const validatorUpdateItem = [
    check("id")
    .exists()
    .notEmpty(),
    check("amount")
    .exists()
    .notEmpty()
    .isFloat(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

module.exports = { validatorGetItem, validatorUpdateItem };
