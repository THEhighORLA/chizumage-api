const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator")

const validatorCreateItem = [
    check("user_status_id")
    .exists()
    .notEmpty(),
    check("name")
    .exists()
    .notEmpty(),
    check("username")
    .exists()
    .notEmpty(),
    check("email")
    .exists()
    .notEmpty(),
    check("creation_date")
    .exists()
    .notEmpty(),
    check("passwordkey")
    .exists()
    .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];
const validatorGetItem = [
    check("id")
    .exists()
    .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const validatorUpdateItem = [
    check("user_status_id")
    .exists()
    .notEmpty(),
    check("name")
    .exists()
    .notEmpty(),
    check("username")
    .exists()
    .notEmpty(),
    check("email")
    .exists()
    .notEmpty(),
    check("creation_date")
    .exists()
    .notEmpty(),
    check("passwordkey")
    .exists()
    .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

module.exports = { validatorCreateItem, validatorGetItem, validatorUpdateItem };
