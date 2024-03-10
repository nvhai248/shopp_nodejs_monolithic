const productRouter = require("./product.router");
const userRouter = require("./user.router");

module.exports = (app) => {
  app.use("/users", userRouter);
  app.use("/products", productRouter);
};
