const express = require(`express`);
const { UserTransport } = require("../transports");
const userRouter = express.Router();

userRouter.post("/sign-up", UserTransport.SignUp);
userRouter.post("/sign-in", UserTransport.SignIn);

module.exports = userRouter;
