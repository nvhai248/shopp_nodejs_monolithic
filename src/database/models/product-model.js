const { Sequelize, DataTypes } = require("sequelize");
const { DB_CONFIG } = require("../../configs/index");
const sequelize = new Sequelize(DB_CONFIG);

const ProductModel = sequelize.define("products", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = ProductModel;
