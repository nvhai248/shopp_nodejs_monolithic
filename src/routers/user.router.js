const express = require(`express`);
const { UserTransport } = require("../transports");
const userRouter = express.Router();

userRouter.get("/", UserTransport.test);

module.exports = userRouter;
