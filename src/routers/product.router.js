const express = require(`express`);
const { ProductTransport } = require("../transports");
const auth = require("../middlewares/auth");
const productRouter = express.Router();

productRouter.get("/:id", auth, ProductTransport.findProductById);
productRouter.post("/", auth, ProductTransport.createNewProduct);
productRouter.get("/", auth, ProductTransport.listProduct);

module.exports = productRouter;
