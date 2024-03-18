const { Sequelize, DataTypes } = require("sequelize");
const { DB_CONFIG } = require("../../configs/index");
const sequelize = new Sequelize(DB_CONFIG);

const RefreshTokenModel = sequelize.define(
  "refresh_tokens",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    refresh_token: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    expired: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.TIME,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = RefreshTokenModel;
