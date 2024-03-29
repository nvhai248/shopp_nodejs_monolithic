const { APICustomError, STATUS_CODES } = require("../../utils/app-errors");
const client = require("../../utils/redis");

class CartRepository {
  constructor() {
    this.redisClient = client;
  }

  async addProductToCart(userId, productId, quantity) {
    try {
      await this.redisClient.hSet(`cart:${userId}`, productId, quantity);
      return true;
    } catch (error) {
      throw new APICustomError(
        "Cache Error",
        STATUS_CODES.BAD_REQUEST,
        "Something went wrong with cache!",
        error.message,
        true
      );
    }
  }

  async getCartInfo(userId) {
    try {
      const cart = await this.redisClient.hGetAll(`cart:${userId}`);
      return cart;
    } catch (error) {
      throw new APICustomError(
        "Cache Error",
        STATUS_CODES.BAD_REQUEST,
        "Failed to retrieve cart information from cache!",
        error.message,
        true
      );
    }
  }

  async changeQuantityOfProduct(userId, productId, quantity) {
    try {
      if (quantity >= 1) {
        await this.redisClient.hSet(`cart:${userId}`, productId, quantity);
      } else if (quantity === 0) {
        await this.removeProduct(userId, productId);
      } else {
        throw new APICustomError(
          "Cache Error",
          STATUS_CODES.BAD_REQUEST,
          "The quantity cannot be negative!"
        );
      }

      return true;
    } catch (error) {
      throw new APICustomError(
        "Cache Error",
        STATUS_CODES.BAD_REQUEST,
        "Failed to change numbers of quantity from cache!",
        error.message,
        true
      );
    }
  }

  async removeProduct(userId, productId) {
    try {
      await this.redisClient.hDel(`cart:${userId}`, productId.toString());
      return true;
    } catch (error) {
      console.log(error);
      throw new APICustomError(
        "Cache Error",
        STATUS_CODES.BAD_REQUEST,
        "Failed to remove product from cache!",
        error.message,
        true
      );
    }
  }
}

module.exports = CartRepository;
