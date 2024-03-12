const productRouter = require("./product.router");
const userRouter = require("./user.router");
const cartRouter = require("./cart.router");

module.exports = (app) => {
  app.use("/api/users", userRouter);
  app.use("/api/products", productRouter);
  app.use("/api/carts", cartRouter);
};
