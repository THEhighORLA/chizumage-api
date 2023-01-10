const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const COperationType = sequelize.define(
  "c_operation_type",
  {
    name: {
      type: DataTypes.STRING,
    },
  },
);

module.exports = COperationType;
