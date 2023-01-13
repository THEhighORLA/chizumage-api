const { matchedData } = require("express-validator");
const { cUserModel, cPassword } = require("../models");
const { handleHttpError } = require("../utils/handleError");

const usDateToLatin = (usDate) =>{
  let aux = usDate.split('-');
  let month = aux[0];
  let day = aux[1];
  let year = aux[2];
  
  return `${day}-${month}-${year}`;
}

const latinDateToUs = (latinDate) =>{
  let aux = latinDate.split('-');
  let month = aux[1];
  let day = aux[0];
  let year = aux[2];
  return `${month}-${day}-${year}`;
}

const getExpirationPasswordDate = (date) => {
  let fDate = new Date(latinDateToUs(date));
  let expiredDate =  new Date(fDate.setMonth(fDate.getMonth()+3)).toLocaleDateString().replaceAll('/','-');
  return usDateToLatin(expiredDate);
}   

/**
 * Obtener lista de la base de datos!
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  try {
    const user = req.user;
    const data = await cUserModel.findAllData({});
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
    const data =  await cUserModel.findOne({ where: { id: id } });
    
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
    const {user_status_id,name, username, email, creation_date,passwordkey} = matchedData(req);
     
    const expiration_date = getExpirationPasswordDate(creation_date,process.env.EXPIRATION_MONTHS);

    let userBody = {
      user_status_id,
      name,
      username,
      email,
      creation_date
    };
    await cUserModel.create(userBody)
    .then(async result => {
      let passwordBody = {
        user_id:result.id,
        passwordkey,
        creation_date,
        expiration_date,
        deleted:0
      }
      const passwordData = await cPassword.create(passwordBody)
      res.status(201);
      res.send({ userData:result, passwordData });
    });;
    
    
    
    
    
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
    const data = await cUserModel.update(
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
    const deleteResponse = await cUserModel.destroy({
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
