const { sequelize } = require("../../config/mysql");
const { DataStatuss, DataTypes } = require("sequelize");

const COperationStatus = sequelize.define(
  "c_operation_status",
  {
    name: {
      type: DataTypes.STRING,
    },
  },
);

module.exports = COperationStatus;
