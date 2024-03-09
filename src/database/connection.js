const CustomerModel = require("./models/user-model");
const ProductModel = require("./models/product-model");

module.exports = async () => {
  try {
    await CustomerModel.sync({ alter: true });
    await ProductModel.sync({ alter: true });

    console.log("Connected to the database.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
