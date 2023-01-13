const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const COperationType = sequelize.define(
  "c_operation_type",
  {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
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
module.exports = COperationType;
