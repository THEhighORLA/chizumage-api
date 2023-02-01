const { sequelize } = require("../../config/mysql")
const { DataTypes } = require("sequelize");
const CUserStatus = require('./cUserStatus');

const CUser = sequelize.define(
  "c_user",
  {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    creation_date: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName:true,
    timestamps:false,
  }
);

CUser.findAllData = function () {
  CUser.belongsTo(CUserStatus, {
    foreignKey: "user_status_id",
    // as: "user_status",
  });
  return CUser.findAll({
    include: [{
      model: CUserStatus,
      // as: 'user_status',
      attributes: ['name'], // columns to select from user table
    }],
  });
};


CUser.find = CUser.findAll;
CUser.findById = CUser.findByPk;
module.exports = CUser;
