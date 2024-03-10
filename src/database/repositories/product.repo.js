const { ProductModel } = require("../models");

class ProductRepository {
  constructor() {
    this.model = ProductModel;
  }

  createNewUser = (productInfo) => {
    return OK;
  };
}

module.exports = ProductRepository;
