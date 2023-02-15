const { matchedData } = require("express-validator");
const { cUserProducts } = require("../models");
const { handleHttpError } = require("../utils/handleError");

const utils = require('./general');

const getUserProductById = async (userProductId) =>  {
  return await cUserProducts.findByPk(userProductId);
}

const updateAmountUserProduct = async (id, amount) => {
  return await cUserProducts.update({ amount }, { where: { id } });
}

/**
 * Obtener lista de la base de datos!
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  try {
    const user = req.user;
    const data = await cUserProducts.findAllData({});
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
    const data =  await cUserProducts.findOne({ where: { id: id } });
    
    res.send({ data });
  }catch(e){
    handleHttpError(res,"ERROR_GET_ITEM")
  }
};

/**
 *  Actualizar un registro
 * @param {*} req
 * @param {*} res
 */
const updateItem = async (req, res) => {
  try {
    
    const {id} = matchedData(req);
    const body = req.body;
    console.log(`Actualizando Registro | id->${id}`)
    console.log(body);
    const data = await cUserProducts.update(
      body,
      { where: { id } }
    );
    res.send({ data });
  } catch (e) {
    console.log("-------------ERROR-------------");
    console.log(e);
    handleHttpError(res, "ERROR_UPDATE_ITEMS");
  }
};

module.exports = { getItems, getItem, updateItem,getUserProductById,updateAmountUserProduct};
