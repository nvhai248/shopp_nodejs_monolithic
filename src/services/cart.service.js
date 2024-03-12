const { CartRepository } = require("../database");
const { DBTypeProduct } = require("../utils/const");
const { unmaskId, maskId } = require("../utils/mask");

class CartService {
  constructor() {
    this.repository = new CartRepository();
  }

  addProductToCart = async (userId, productId, quantity) => {
    try {
      await this.repository.addProductToCart(
        userId,
        unmaskId(productId, DBTypeProduct),
        quantity
      );
    } catch (error) {
      throw error;
    }
  };

  getCartByUserId = async (userId) => {
    try {
      const cart = await this.repository.getCartInfo(userId);
      const items = [];
      for (const [key, value] of Object.entries(cart)) {
        items.push({
          product_id: maskId(parseInt(key), DBTypeProduct),
          quantity: parseInt(value),
        });
      }
      return items;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = CartService;
