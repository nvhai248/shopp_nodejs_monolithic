const { DBError } = require("../../utils/app-errors");
const { RefreshTokenModel } = require("../models");

class RefreshTokenRepository {
  constructor() {
    this.model = RefreshTokenModel;
  }

  saveToDB = async (refreshTokenData) => {
    try {
      const result = await this.model.create(refreshTokenData);
      return result.dataValues;
    } catch (error) {
      throw new DBError(error.message, "Something went wrong with DB!");
    }
  };

  checkInDB = async (tokenStr) => {
    try {
      const result = await this.model.findOne({
        where: {
          refresh_token: tokenStr,
        },
      });
      return result.dataValues;
    } catch (error) {
      throw new DBError(error.message, "Something went wrong with DB!");
    }
  };

  removeFromDB = async (refreshTokenStr, userId) => {
    try {
      const result = await this.model.destroy({
        where: {
          refresh_token: refreshTokenStr,
          user_id: parseInt(userId),
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      throw new DBError(error.message, "Something went wrong with DB!");
    }
  };
}

module.exports = RefreshTokenRepository;
