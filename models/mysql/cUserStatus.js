const { sequelize } = require("../../config/mysql")
const { DataTypes } = require("sequelize");

const CUserStatus = sequelize.define(
  "c_user_status",
  {
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName:true,
    timestamps:false,
  }
);
CUserStatus.find = CUserStatus.findAll;
CUserStatus.findById = CUserStatus.findByPk;
module.exports = CUserStatus;
