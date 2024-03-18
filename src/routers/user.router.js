const express = require(`express`);
const { UserTransport } = require("../transports");
const auth = require("../middlewares/auth");
const userRouter = express.Router();

userRouter.post("/sign-up", UserTransport.SignUp);
userRouter.post("/sign-in", UserTransport.SignIn);
userRouter.post("/refresh-token", UserTransport.RefreshToken);
userRouter.post("/sign-out",auth, UserTransport.LogOut);

module.exports = userRouter;
