const { UserRepository } = require("../database");
const {
  APICustomError,
  STATUS_CODES,
  BadRequestError,
  DBError,
} = require("../utils/app-errors");
const { DBTypeUser } = require("../utils/const");
const {
  generateSalt,
  generatePassword,
  validatePassword,
} = require("../utils/hash");
const { generateToken } = require("../utils/jwt");
const { maskId } = require("../utils/mask");

class UserService {
  constructor() {
    this.repository = new UserRepository();
  }

  SignUp = async (userInfo) => {
    try {
      const user = await this.repository.findUserByEmail(userInfo.email);
      if (user) {
        throw new APICustomError(
          "Error Bad request",
          STATUS_CODES.BAD_REQUEST,
          `Email ${user.email} already used by another user`,
          true
        );
      }

      userInfo.salt = await generateSalt();
      userInfo.password = await generatePassword(
        userInfo.password,
        userInfo.salt
      );

      return await this.repository.createNewUser(userInfo);
    } catch (error) {
      throw error;
    }
  };

  SignIn = async (userLogin) => {
    try {
      const user = await this.repository.findUserByEmail(userLogin.email);

      if (!user) {
        throw new BadRequestError(
          "Invalid email address or password!",
          "Invalid email address or password!"
        );
      }

      const PwIsCorrect = await validatePassword(
        userLogin.password,
        user.password,
        user.salt
      );

      if (!PwIsCorrect) {
        throw new BadRequestError(
          "Invalid email address or password!",
          "Invalid email address or password!"
        );
      }

      const tokenStr = await generateToken({ id: user.id }, "7d");

      user.id = maskId(user.id, DBTypeUser);
      return {
        token: tokenStr,
        user: user,
      };
    } catch (error) {
      throw error;
    }
  };
}

module.exports = UserService;
