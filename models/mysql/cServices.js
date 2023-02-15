const { sequelize } = require("../../config/mysql")
const { DataTypes } = require("sequelize");

const CServices = sequelize.define(
  "c_services",
  {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
    },
    code: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName:true,
    timestamps:false,
  }
);


CServices.find = CServices.findAll;
CServices.findById = CServices.findByPk;
module.exports = CServices;
