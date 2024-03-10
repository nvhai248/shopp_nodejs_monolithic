const { UserService } = require("../services");
const { STATUS_CODES } = require("../utils/app-errors");
const { ErrorResponse } = require("../utils/error-handler");
const SuccessResponse = require("../utils/success-response");

class UserTransport {
  constructor() {
    this.service = new UserService();
  }

  SignUp = async (req, res) => {
    try {
      const userInfo = req.body;

      const data = await this.service.SignUp(userInfo);
      res
        .status(STATUS_CODES.OK)
        .send(new SuccessResponse(data, "Successfully signed up!"));
    } catch (error) {
      ErrorResponse(error, res);
    }
  };

  SignIn = async (req, res) => {
    try {
      const userLogin = req.body;

      const data = await this.service.SignIn(userLogin);
      res
        .status(STATUS_CODES.OK)
        .send(new SuccessResponse(data, "Successfully signed in!"));
    } catch (error) {
      ErrorResponse(error, res);
    }
  };
}

module.exports = new UserTransport();
