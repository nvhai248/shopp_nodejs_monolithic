const { DBError } = require("../../utils/app-errors");
const client = require("../../utils/elasticsearch");
const { ProductModel } = require("../models");

class ProductRepository {
  constructor() {
    this.model = ProductModel;
    this.elasticClient = client;
  }

  createNewProduct = async (productInfo) => {
    try {
      const newProduct = await this.model.create(productInfo);
      return newProduct.dataValues;
    } catch (error) {
      throw new DBError(error.message, "Something went wrong with database!");
    }
  };

  listProducts = async (limit, offset) => {
    try {
      const products = await this.model.findAll({
        limit: limit,
        offset: offset,
      });
      const formattedProducts = products.map((product) => product.dataValues);

      return formattedProducts || [];
    } catch (error) {
      throw new DBError(error.message, "Something went wrong with database!");
    }
  };

  getTotal = async () => {
    try {
      const total = await this.model.count();

      return total;
    } catch (error) {
      throw new DBError(error.message, "Something went wrong with database!");
    }
  };

  getProductById = async (id) => {
    try {
      const res = await this.model.findOne({
        where: {
          id: id,
        },
      });

      return res.dataValues;
    } catch (error) {
      throw new DBError(error.message, "Something went wrong with database!");
    }
  };

  searchProducts = async (searchContent, limit, offset) => {
    try {
      const response = await client.search({
        index: "products",
        body: {
          query: {
            multi_match: {
              query: searchContent,
              fields: ["name", "shop.name"],
            },
          },
          size: limit,
          from: offset,
        },
      });

      return response.hits.hits;
    } catch (error) {
      throw new DBError(error.message, "Something went wrong with database!");
    }
  };

  getSearchTotal = async (searchContent) => {
    try {
      const response = await client.search({
        index: "products",
        body: {
          query: {
            multi_match: {
              query: searchContent,
              fields: ["name", "shop.name"],
            },
          },
        },
      });

      return response.hits.total.value;
    } catch (error) {
      throw new DBError(error.message, "Something went wrong with database!");
    }
  };
}

module.exports = ProductRepository;
