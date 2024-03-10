const productRouter = require("./product.router");
const userRouter = require("./user.router");

module.exports = (app) => {
  app.use("/api/users", userRouter);
  app.use("/api/products", productRouter);
};
