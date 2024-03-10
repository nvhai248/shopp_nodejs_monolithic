const jwt = require("jsonwebtoken");

const { APP_SECRET } = require("../configs/index");

const generateToken = (payload, expireTime) => {
  try {
    return jwt.sign(payload, APP_SECRET, { expiresIn: expireTime });
  } catch (error) {
    console.log(error);
    return error;
  }
};

const extractBearerToken = (authorizationHeader) => {
  if (typeof authorizationHeader !== "string") {
    return null;
  }

  const parts = authorizationHeader.split(" ");
  if (parts.length === 2 && parts[0] === "Bearer") {
    return parts[1];
  }

  return null;
};

const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, secret_key);
    return payload;
  } catch (error) {
    return null;
  }
};

const formatData = (data) => {
  if (data) {
    return { data };
  } else {
    throw new Error("Data Not found!");
  }
};

module.exports = {
  extractBearerToken,
  verifyToken,
  generateToken,
  formatData,
};
