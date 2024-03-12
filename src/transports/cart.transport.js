const { CartService } = require("../services");
const { STATUS_CODES } = require("../utils/app-errors");
const { ErrorResponse } = require("../utils/error-handler");
const SuccessResponse = require("../utils/success-response");

class CartTransport {
  constructor() {
    this.service = new CartService();
  }

  // [POST] /carts
  AddProductToCart = async (req, res) => {
    try {
      const user_id = req.user.id;
      const { product_id, quantity } = req.body;
      const message = await this.service.addProductToCart(
        user_id,
        product_id,
        quantity
      );

      res
        .status(STATUS_CODES.OK)
        .send(new SuccessResponse(message, "Cart added successfully!", null));
    } catch (error) {
      ErrorResponse(error, res);
    }
  };

  // [GET] /carts
  GetCartOfUser = async (req, res) => {
    try {
      const user_id = req.user.id;
      const data = await this.service.getCartByUserId(user_id);

      res
        .status(STATUS_CODES.OK)
        .send(new SuccessResponse(data, "Successfully!", null));
    } catch (error) {
      ErrorResponse(error, res);
    }
  };
}

module.exports = new CartTransport();
