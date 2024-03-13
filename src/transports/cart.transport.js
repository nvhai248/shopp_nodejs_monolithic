const { CartService } = require("../services");
const { STATUS_CODES } = require("../utils/app-errors");
const { ErrorResponse } = require("../utils/error-handler");
const { SetResponse } = require("../utils/success-response");

class CartTransport {
  constructor() {
    this.service = new CartService();
  }

  // [POST] /carts
  AddProductToCart = async (req, res) => {
    try {
      const user_id = req.user.id;
      const { product_id, quantity } = req.body;
      const isDone = await this.service.addProductToCart(
        user_id,
        product_id,
        quantity
      );

      if (isDone)
        SetResponse(res, STATUS_CODES.OK, true, "Successfully!", null);
      else SetResponse(res, STATUS_CODES.BAD_REQUEST, false, "Failed!", null);
    } catch (error) {
      ErrorResponse(error, res);
    }
  };

  // [GET] /carts
  GetCartOfUser = async (req, res) => {
    try {
      const user_id = req.user.id;
      const data = await this.service.getCartByUserId(user_id);

      SetResponse(res, STATUS_CODES.OK, data, "Successfully!", null);
    } catch (error) {
      ErrorResponse(error, res);
    }
  };

  // [PATCH] /carts
  ChangeQuantityProductOfCart = async (req, res) => {
    try {
      const { product_id, quantity } = req.body;
      const user_id = req.user.id;
      const isDone = await this.service.changeNumbersOfProductInCart(
        user_id,
        product_id,
        quantity
      );

      if (isDone)
        SetResponse(res, STATUS_CODES.OK, true, "Successfully!", null);
      else SetResponse(res, STATUS_CODES.BAD_REQUEST, false, "Failed!", null);
    } catch (error) {
      ErrorResponse(error, res);
    }
  };

  // [DELETE] /carts
  RemoveQuantityFromCart = async (req, res) => {
    try {
      const { product_id } = req.body;
      const user_id = req.user.id;
      const isDone = await this.service.removeProductFromCart(
        user_id,
        product_id
      );

      if (isDone)
        SetResponse(res, STATUS_CODES.OK, true, "Successfully!", null);
      else SetResponse(res, STATUS_CODES.BAD_REQUEST, false, "Failed!", null);
    } catch (error) {
      ErrorResponse(error, res);
    }
  };
}

module.exports = new CartTransport();
