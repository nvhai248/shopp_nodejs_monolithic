const { UserService } = require("../services");
const { STATUS_CODES } = require("../utils/app-errors");
const { ErrorResponse } = require("../utils/error-handler");
const { SetResponse } = require("../utils/success-response");

class UserTransport {
  constructor() {
    this.service = new UserService();
  }

  SignUp = async (req, res) => {
    try {
      const userInfo = req.body;

      const data = await this.service.SignUp(userInfo);

      SetResponse(res, STATUS_CODES.OK, data, "Successfully signed up!", null);
    } catch (error) {
      ErrorResponse(error, res);
    }
  };

  SignIn = async (req, res) => {
    try {
      const userLogin = req.body;

      const data = await this.service.SignIn(userLogin);

      SetResponse(res, STATUS_CODES.OK, data, "Successfully signed in!", null);
    } catch (error) {
      ErrorResponse(error, res);
    }
  };

  RefreshToken = async (req, res) => {
    try {
      const { token_string } = req.body;

      const data = await this.service.RefreshToken(token_string);
      SetResponse(res, STATUS_CODES.OK, data, "Successfully!", null);
    } catch (error) {
      ErrorResponse(error, res);
    }
  };

  LogOut = async (req, res) => {
    try {
      const { token_string } = req.body;
      const userId = req.user.id;

      const result = await this.service.LogOut(token_string, userId);

      if (result) {
        SetResponse(res, STATUS_CODES.OK, null, "Successfully!", null);
      } else {
        SetResponse(
          res,
          STATUS_CODES.BAD_REQUEST,
          null,
          "Records not found!",
          null
        );
      }
    } catch (error) {
      ErrorResponse(error, res);
    }
  };
}

module.exports = new UserTransport();
