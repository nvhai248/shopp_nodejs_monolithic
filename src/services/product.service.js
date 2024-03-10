const { ProductRepository } = require("../database");

class ProductService {
  constructor() {
    this.repository = new ProductRepository();
  }

  check = () => {
    return this.repository.createNewUser(null);
  };
}

module.exports = ProductService;
