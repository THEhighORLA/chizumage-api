const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/session");
const checkRol = require("../middleware/rol");

const {
    getItems,
    getItem,
    getItemsByCode
  } = require("../controllers/cServices");


router.get("/", getItems);

router.get("/:code", getItemsByCode);

router.get("/:id", getItem);


module.exports = router;