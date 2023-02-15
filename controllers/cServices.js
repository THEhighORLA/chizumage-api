const { matchedData } = require("express-validator");
const { cServices } = require("../models");
const { handleHttpError } = require("../utils/handleError");


const getItems = async (req, res) => {
    try {
        const items = await cServices.find({});
        res.status(200).json(items);
    } catch (error) {
        handleHttpError(res, "ERROR_GET_ITEMS", error);
    }
}


const getItem = async (req, res) => {
    try {
        req = matchedData(req);
        const {id} = req;

        const item = await cServices.getItem(id);
        res.status(200).json(item);
    } catch (error) {
        handleHttpError(res, "ERROR_GET_ITEMS", error);
    }
}


const getItemsByCode = async (req, res) => {
    try {
        const {code} = matchedData(req)

        const items = await cServices.findOne({ where: { code } });
        res.status(200).json(items);
    } catch (error) {
        handleHttpError(res, "ERROR_GET_ITEMS", error);
    }
}


module.exports = {getItems,getItem,getItemsByCode};