const { matchedData } = require("express-validator");
const { cOperationTransactionModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const { getUserById } = require("./cUser");
const { getUserProductById , updateAmountUserProduct} = require("./cUserProducts");



const utils = require('./general');

/**
 * Obtener lista de la base de datos!
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  try {
    const user = req.user;
    const data = await cOperationTransactionModel.findAllData({});
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
    const data =  await cOperationTransactionModel.findOne({ where: { id: id } });
    
    res.send({ data });
  }catch(e){
    handleHttpError(res,"ERROR_GET_ITEM")
  }
};

/**
 * Insertar un registro
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
  try {
    console.log("Registrando nuevo Ingreso")
    const {user_id,operation_type_id, operation_status_id,destinatary_name,destinatary_email,creation_date,amount_value,comentary} = matchedData(req);
     
    let opBody = {
      user_id,
      operation_type_id,
      operation_status_id,
      destinatary_name,
      destinatary_email,
      creation_date:utils.formatBdDate(creation_date,'lat'),
      amount_value,
      comentary
    };
    
    const userData = await getUserById(user_id);
    const userProductId = operation_type_id == 1? userData['pay_product_id']:userData['tx_product_id'];
    
    const userProductData = await getUserProductById(userProductId);
    let total = parseFloat(userProductData['amount_value']);

    if(operation_type_id == 1){
      total = parseFloat(userProductData.amount) + parseFloat(opBody.amount_value);
    }else{
      total = parseFloat(userProductData.amount) - parseFloat(opBody.amount_value);
    }

    let data = {};
    let status;

    if(total > 0 ){
      updateAmountUserProduct(userProductId,total);
      data = await cOperationTransactionModel.create(opBody);
      status = utils.statusSender('000000');
    }else{
      status = utils.statusSender('100100');
    }

    res.status(201);
    res.send({ data,status});
  } catch (e) {
    console.log("-------------ERROR-------------");
    console.log(e);
    handleHttpError(res, "ERROR_CREATE_ITEMS");
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
    const data = await cOperationTransactionModel.update(
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

/**
 * Eliminar un registro
 * @param {*} req
 * @param {*} res
 */
const deleteItem = async (req, res) => {
  try{
    req = matchedData(req);
    const {id} = req;
    const deleteResponse = await cOperationTransactionModel.destroy({
        where: {
            id
        }
    });
    const data = {
      deleted: deleteResponse.matchedCount
    }
    
    res.send({data});
  }catch(e){
    console.log(e)
    handleHttpError(res,"ERROR_DELETE_ITEM")
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
