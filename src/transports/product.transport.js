const { ProductService } = require("../services");
const { STATUS_CODES } = require("../utils/app-errors");
const { ErrorResponse } = require("../utils/error-handler");
const { SetResponse } = require("../utils/success-response");

class ProductTransport {
  constructor() {
    this.service = new ProductService();
  }

  createNewProduct = async (req, res) => {
    try {
      const productData = req.body;
      const data = await this.service.createNewProduct(productData);

      SetResponse(
        res,
        STATUS_CODES.OK,
        data,
        "Successfully create new product!",
        null
      );
    } catch (error) {
      ErrorResponse(error, res);
    }
  };

  findProductById = async (req, res) => {
    try {
      const id = req.params.id;

      const data = await this.service.findProductById(id);

      SetResponse(res, STATUS_CODES.OK, data, "Successfully!", null);
    } catch (error) {
      ErrorResponse(error, res);
    }
  };

  listProduct = async (req, res) => {
    try {
      const { limit, page, cursor } = req.query;

      const data = await this.service.getListProducts(limit, page, cursor);

      SetResponse(
        res,
        STATUS_CODES.OK,
        data.products,
        "Successfully!",
        data.paging.total === 0 ? null : data.paging
      );
    } catch (error) {
      ErrorResponse(error, res);
    }
  };

  searchProducts = async (req, res) => {
    try {
      const { limit, page, value } = req.query;

      const data = await this.service.searchProducts(value, limit, page);

      SetResponse(
        res,
        STATUS_CODES.OK,
        data.products,
        "Successfully!",
        data.paging.total === 0 ? null : data.paging
      );
    } catch (error) {
      ErrorResponse(error, res);
    }
  };
}

module.exports = new ProductTransport();
