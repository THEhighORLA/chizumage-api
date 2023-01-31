const { sequelize } = require("../../config/mysql");
const {  DataTypes } = require("sequelize");

const CUser = require('./cUser');
const CProducts = require('./cProducts');

const CUserProducts = sequelize.define(
  "c_user_products",
  {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    product_id: {
      type: DataTypes.INTEGER,
    },
    amount: {
      type: DataTypes.FLOAT,
    },
    alt_name: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName:true,
    timestamps:false
  }
);

CUserProducts.findAllData = function () {
  CUserProducts.belongsTo(CProducts, {
    foreignKey: "product_id",
    // as: "prod_name",
  });

  CUserProducts.belongsTo(CUser, {
    foreignKey: "user_id",
    // as: "user_name",
  });
  return CUserProducts.findAll({
    include: [
      {
        model: CUser,
        // as: 'user_name',
        attributes: ['name'], // columns to select from user table
      },
      {
        model: CProducts,
        // as: 'prod_name',
        attributes: ['name'], // columns to select from user table
      }
    ],
  });
};

CUserProducts.find = CUserProducts.findAll;
CUserProducts.findById = CUserProducts.findByPk;
module.exports = CUserProducts;
