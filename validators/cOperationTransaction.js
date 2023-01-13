const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator")

const validatorCreateItem = [
    check("user_id")
    .exists()
    .notEmpty(),
    check("operation_type_id")
    .exists()
    .notEmpty(),
    check("operation_status_id")
    .exists()
    .notEmpty(),
    check("creation_date")
    .exists()
    .notEmpty(),
    check("destinatary_name")
    .exists(),
    check("destinatary_email")
    .exists(),
    check("amount_value")
    .exists()
    .notEmpty()
    .isFloat(),
    check("comentary")
    .exists(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

module.exports = { validatorCreateItem};
