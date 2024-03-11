const { ProductRepository } = require("../database");
const { DBTypeProduct } = require("../utils/const");
const { maskId, unmaskId } = require("../utils/mask");

class ProductService {
  constructor() {
    this.repository = new ProductRepository();
  }

  createNewProduct = async (productData) => {
    try {
      const data = await this.repository.createNewProduct(productData);
      data.id = maskId(data.id, DBTypeProduct);
      return;
    } catch (error) {
      throw error;
    }
  };

  getListProducts = async (limit, page, cursor) => {
    try {
      limit = limit || 20;
      page = page || 1;
      const offset = cursor || (page - 1) * limit;

      const total = await this.repository.getTotal();

      const products = await this.repository.listProducts(limit, offset);

      for (let i = 0; i < products.length; i++) {
        products[i].id = maskId(products[i].id, DBTypeProduct);
      }

      return {
        products: products,
        paging: {
          limit: limit,
          page: page,
          total: total,
          fakeCursor: total === 0 ? null : maskId(offset, DBTypeProduct),
          nextCursor:
            total === 0 || offset + products.length + 1 >= total
              ? null
              : maskId(offset + products.length + 1, DBTypeProduct),
        },
      };
    } catch (error) {
      throw error;
    }
  };

  findProductById = async (id) => {
    try {
      id = unmaskId(id, DBTypeProduct);
      const data = await this.repository.getProductById(id);
      data.id = maskId(data.id, DBTypeProduct);

      return data;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = ProductService;
