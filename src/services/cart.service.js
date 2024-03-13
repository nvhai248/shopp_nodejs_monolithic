const { CartRepository, ProductRepository } = require("../database");
const { DBTypeProduct } = require("../utils/const");
const { unmaskId, maskId } = require("../utils/mask");

class CartService {
  constructor() {
    this.repository = new CartRepository();
    this.productRepo = new ProductRepository();
  }

  addProductToCart = async (userId, productId, quantity) => {
    try {
      return await this.repository.addProductToCart(
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
        const product = await this.productRepo.getProductById(key);
        product.id = maskId(parseInt(key), DBTypeProduct);
        items.push({
          product: product,
          quantity: parseInt(value),
        });
      }

      return items;
    } catch (error) {
      throw error;
    }
  };

  changeNumbersOfProductInCart = async (userId, productId, quantity) => {
    try {
      return await this.repository.changeQuantityOfProduct(
        userId,
        unmaskId(productId, DBTypeProduct),
        quantity
      );
    } catch (error) {
      throw error;
    }
  };

  removeProductFromCart = async (userId, productId) => {
    try {
      return await this.repository.removeProduct(
        userId,
        unmaskId(productId, DBTypeProduct)
      );
    } catch (error) {
      throw error;
    }
  };
}

module.exports = CartService;
