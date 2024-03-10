const express = require(`express`);
const { ProductTransport } = require("../transports");
const productRouter = express.Router();

productRouter.get("/", ProductTransport.test);

module.exports = productRouter;
