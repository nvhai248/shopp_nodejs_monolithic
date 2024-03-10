const { UserService } = require("../services");
const { STATUS_CODES } = require("../utils/app-errors");
const SuccessResponse = require("../utils/success-response");

class UserTransport {
  constructor() {
    this.service = new UserService();
  }

  test = (req, res) => {
    const data = this.service.SignIn();
    res.status(STATUS_CODES.OK).send(new SuccessResponse(data, "OK"));
  };
}

module.exports = new UserTransport();
