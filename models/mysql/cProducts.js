const { sequelize } = require("../../config/mysql");
const { DataStatuss, DataTypes } = require("sequelize");

const CProducts = sequelize.define(
  "c_products",
  {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName:true,
    timestamps:false
  }
);
module.exports = CProducts;
