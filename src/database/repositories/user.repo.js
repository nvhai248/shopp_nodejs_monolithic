const { DBError } = require("../../utils/app-errors");
const { UserModel } = require("../models");

class UserRepository {
  constructor() {
    this.model = UserModel;
  }

  createNewUser = async (userInfo) => {
    try {
      const newUser = await this.model.create(userInfo);
      return newUser.dataValues;
    } catch (error) {
      throw new DBError(error.message, "Something went wrong with database!");
    }
  };

  findUserByEmail = async (email) => {
    try {
      const user = await this.model.findOne({
        where: {
          email: email,
        },
      });
      return user.dataValues;
    } catch (error) {
      throw new DBError(error.message, "Something went wrong with database!");
    }
  };
}

module.exports = UserRepository;
