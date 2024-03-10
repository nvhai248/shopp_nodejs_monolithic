const {
  STATUS_CODES,
  APIError,
  UnauthorizeError,
} = require("../utils/app-errors");
const { extractBearerToken, verifyToken } = require("../utils/jwt");

module.exports = async (req, res, next) => {
  try {
    const bearerToken = req.get("Authorization");

    const tokenStr = extractBearerToken(bearerToken);

    if (!tokenStr) {
      res
        .status(STATUS_CODES.UNAUTHORIZED)
        .send(
          new UnauthorizeError("Unauthorized", "Wrong Authorization header!")
        );
    }

    const payload = verifyToken(tokenStr);

    if (!payload) {
      res
        .status(STATUS_CODES.UNAUTHORIZED)
        .send(new UnauthorizeError("Unauthorized", "Token is invalid!"));
    }
    req.user = payload;
    next();
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send(new APIError());
  }
};
