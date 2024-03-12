const express = require(`express`);
const { CartTransport } = require("../transports");
const auth = require("../middlewares/auth");
const cartRouter = express.Router();

cartRouter.get("/", auth, CartTransport.GetCartOfUser);
cartRouter.post("/", auth, CartTransport.AddProductToCart);

module.exports = cartRouter;
