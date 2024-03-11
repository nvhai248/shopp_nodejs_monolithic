const { STATUS_CODES } = require("./app-errors");

class SuccessResponse {
  constructor(data, message, paging) {
    this.statusCode = STATUS_CODES.OK;
    this.data = data;
    this.message = message;

    if (paging) {
      this.paging = paging;
    }
  }
}

module.exports = SuccessResponse;
