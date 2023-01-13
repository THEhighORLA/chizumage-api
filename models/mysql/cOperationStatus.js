const { sequelize } = require("../../config/mysql");
const { DataStatuss, DataTypes } = require("sequelize");

const COperationStatus = sequelize.define(
  "c_operation_status",
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
module.exports = COperationStatus;
