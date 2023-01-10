const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");
const cOperationType = require('./cOperationType');
const COperationStatus = require("./cOperationStatus");

const COperationTransaction = sequelize.define(
  "c_operation_transaction",
  {
    user_id: {
      type: DataTypes.INTEGER,
    },
    operation_type_id: {
      type: DataTypes.INTEGER,
    },
    operation_status_id: {
      type: DataTypes.INTEGER,
    },
    destinatary_name: {
      type: DataTypes.STRING,
    },
    destinatary_email: {
      type: DataTypes.STRING,
    },
    creation_date: {
      type: DataTypes.INTEGER,
    },
    amount_value: {
      type: DataTypes.INTEGER,
    },
    comentary: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Implementando modelo personalizado
 */

COperationTransaction.findAllData = function () {
  COperationTransaction.belongsTo(cOperationType, {
    foreignKey: "operation_type_id",
    as: "id",
  });
  return COperationTransaction.findAll({ include: "id" });
};

COperationTransaction.findAllData = function () {
  COperationTransaction.belongsTo(COperationStatus, {
    foreignKey: "operation_status_id",
    as: "id",
  });
  return COperationTransaction.findAll({ include: "id" });
};

// COperationTransaction.find = COperationTransaction.findAll;
// COperationTransaction.findById = COperationTransaction.findByPk;
module.exports = COperationTransaction;
