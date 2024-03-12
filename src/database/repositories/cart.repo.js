const { APICustomError, STATUS_CODES } = require("../../utils/app-errors");
const client = require("../../utils/redis");

class CartRepository {
  constructor() {
    this.redisClient = client;
  }

  async addProductToCart(userId, productId, quantity) {
    try {
      await this.redisClient.hSet(`cart:${userId}`, productId, quantity);
      return { message: "Product added to cart successfully" };
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
}

module.exports = CartRepository;
