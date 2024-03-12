const { UserRepository } = require("../database");
const { STATUS_CODES, UnauthorizeError } = require("../utils/app-errors");
const { ErrorResponse } = require("../utils/error-handler");
const { extractBearerToken, verifyToken } = require("../utils/jwt");

module.exports = async (req, res, next) => {
  try {
    const bearerToken = req.get("Authorization");

    const tokenStr = extractBearerToken(bearerToken);

    if (!tokenStr) {
      return res
        .status(STATUS_CODES.UNAUTHORIZED)
        .send(
          new UnauthorizeError("Unauthorized", "Wrong Authorization header!")
        );
    }

    const payload = verifyToken(tokenStr);

    if (!payload) {
      return res
        .status(STATUS_CODES.UNAUTHORIZED)
        .send(new UnauthorizeError("Unauthorized", "Token is invalid!"));
    }

    const user = await new UserRepository().findUserById(payload.id);

    if (!user) {
      return res
        .status(STATUS_CODES.UNAUTHORIZED)
        .send(new UnauthorizeError("Unauthorized", "User not found!"));
    }

    req.user = user;
    next();
  } catch (error) {
    ErrorResponse(error, res);
  }
};
