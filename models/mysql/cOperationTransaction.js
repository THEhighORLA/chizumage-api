const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");
const COperationType = require('./cOperationType');
const COperationStatus = require("./cOperationStatus");
const CUser = require("./cUser");

const COperationTransaction = sequelize.define(
  "c_operation_transaction",
  {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
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
    timestamps: false,
    freezeTableName:true
  }
);

/**
 * Implementando modelo personalizado
 */
COperationTransaction.findAllData = function () {
  COperationTransaction.belongsTo(CUser, {
    foreignKey: "user_id",
    as: "user_name",
  });
  COperationTransaction.belongsTo(COperationType, {
    foreignKey: "operation_type_id",
    as: "op_type",
  });
  COperationTransaction.belongsTo(COperationStatus, {
    foreignKey: "operation_status_id",
    as: "op_status",
  });
  return COperationTransaction.findAll({
    include: [
      {
        model: CUser,
        as: 'user_name',
        attributes: ['name'], // columns to select from user table
      },
      {
        model: COperationType,
        as: 'op_type',
        attributes: ['name'], // columns to select from user table
      },{
        model: COperationStatus,
        as: 'op_status',
        attributes: ['name'], // columns to select from user table
      },
    ],
  });
};


COperationTransaction.find = COperationTransaction.findAll;
COperationTransaction.findById = COperationTransaction.findByPk;
module.exports = COperationTransaction;
