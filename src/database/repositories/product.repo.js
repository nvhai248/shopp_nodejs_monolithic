const { ProductModel } = require("../models");

class ProductRepository {
  constructor() {
    this.model = new ProductModel();
  }

  createNewUser = (productInfo) => {
    return OK;
  };
}

module.exports = ProductRepository;
