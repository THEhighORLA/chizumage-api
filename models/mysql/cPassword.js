const { sequelize } = require("../../config/mysql")
const { DataTypes } = require("sequelize");
const CUser = require('./cUser');

const CPassword = sequelize.define(
  "c_password",
  {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    passwordkey: {
      type: DataTypes.STRING,
    },
    creation_date: {
      type: DataTypes.STRING,
    },
    expiration_date: {
      type: DataTypes.STRING,
    },
    deleted: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName:true,
    timestamps:false,
  }
);

CPassword.findAllData = function () {
  CPassword.belongsTo(CUser, {
    foreignKey: "user_id",
    // as: "fk_user_status1",
  });
  return CPassword.findAll();
};


CPassword.find = CPassword.findAll;
CPassword.findById = CPassword.findByPk;
module.exports = CPassword;
