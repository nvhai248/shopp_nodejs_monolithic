const express = require(`express`);
const { CartTransport } = require("../transports");
const auth = require("../middlewares/auth");
const cartRouter = express.Router();

cartRouter.get("/", auth, CartTransport.GetCartOfUser);
cartRouter.post("/", auth, CartTransport.AddProductToCart);
cartRouter.patch("/", auth, CartTransport.ChangeQuantityProductOfCart);
cartRouter.delete("/", auth, CartTransport.RemoveQuantityFromCart);

module.exports = cartRouter;
