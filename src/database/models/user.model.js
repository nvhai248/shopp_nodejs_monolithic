const { Sequelize, DataTypes } = require("sequelize");
const { DB_CONFIG } = require("../../configs/index");
const sequelize = new Sequelize(DB_CONFIG);

const UserModel = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salt: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Overwrite for password and salt when return JSON
UserModel.prototype.toJSON = function () {
  const values = { ...this.get() };
  delete values.password;
  delete values.salt;
  return values;
};

module.exports = UserModel;
