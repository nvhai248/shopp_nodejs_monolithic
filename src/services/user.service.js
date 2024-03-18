const { UserRepository, RefreshTokenRepository } = require("../database");
const {
  APICustomError,
  STATUS_CODES,
  BadRequestError,
  UnauthorizeError,
} = require("../utils/app-errors");
const { DBTypeUser } = require("../utils/const");
const {
  generateSalt,
  generatePassword,
  validatePassword,
} = require("../utils/hash");
const { generateToken, verifyToken } = require("../utils/jwt");
const { maskId } = require("../utils/mask");

class UserService {
  constructor() {
    this.repository = new UserRepository();
    this.refreshTokenRepository = new RefreshTokenRepository();
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

      const accessTokenStr = await generateToken({ id: user.id }, 15 * 60); // 15 minutes
      const refreshTokenStr = await generateToken(
        { id: user.id },
        14 * 24 * 60 * 60
      ); // two weeks

      const refreshToken = await this.refreshTokenRepository.saveToDB({
        user_id: user.id,
        refresh_token: refreshTokenStr,
        expired: 14 * 24 * 60 * 60,
      });

      user.id = maskId(user.id, DBTypeUser);
      delete user.password;
      delete user.salt;
      return {
        accessToken: { token_string: accessTokenStr, expired: 15 * 60 },
        refreshTokenStr: refreshToken,
        user: user,
      };
    } catch (error) {
      throw error;
    }
  };

  RefreshToken = async (tokenStr) => {
    try {
      const refreshTokenDB = await this.refreshTokenRepository.checkInDB(
        tokenStr
      );

      const payload = verifyToken(refreshTokenDB.refresh_token);
      if (!payload) {
        throw new UnauthorizeError(
          "Unauthorized!",
          "Token is invalid! Please re login."
        );
      }

      const accessToken = generateToken({ user_id: payload.user_id }, 15 * 60);
      return {
        accessToken: { token_string: accessToken, expired: 15 * 60 },
      };
    } catch (error) {
      throw error;
    }
  };

  LogOut = async (tokenStr, userId) => {
    try {
      const result = this.refreshTokenRepository.removeFromDB(tokenStr, userId);
      return result;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = UserService;
