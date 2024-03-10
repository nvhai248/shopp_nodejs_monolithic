const { ProductService } = require("../services");
const { STATUS_CODES } = require("../utils/app-errors");
const SuccessResponse = require("../utils/success-response");

class ProductTransport {
  constructor() {
    this.service = new ProductService();
  }

  test = (req, res) => {
    const data = this.service.check();
    res.status(STATUS_CODES.OK).send(new SuccessResponse(data, "OK"));
  };
}

module.exports = new ProductTransport();
