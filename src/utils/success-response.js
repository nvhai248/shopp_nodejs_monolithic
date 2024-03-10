const { STATUS_CODES } = require("./app-errors");

class SuccessResponse {
  constructor(data, message) {
    this.statusCode = STATUS_CODES.OK;
    this.data = data;
    this.message = message;
  }
}

module.exports = SuccessResponse;
