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
}

module.exports = new UserTransport();
