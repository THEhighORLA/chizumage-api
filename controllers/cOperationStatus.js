const { matchedData } = require("express-validator");
const { cOperationStatusModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

const utils = require('./general');

/**
 * Obtener lista de la base de datos!
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  try {
    const user = req.user;
    const data = await cOperationStatusModel.findAll({});
    console.log('Obteniendo todos los datos...');
    res.send({ data,  user });
  } catch (e) {
    console.log(e)
    handleHttpError(res, "ERROR_GET_ITEMS");
  }
};

/**
 * Obtener un detalle
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req, res) => {
  try{
    req = matchedData(req);
    const {id} = req;
    const data =  await cOperationStatusModel.findOne({ where: { id: id } });
    
    res.send({ data });
  }catch(e){
    handleHttpError(res,"ERROR_GET_ITEM")
  }
};



module.exports = { getItems, getItem };
