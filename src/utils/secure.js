const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { APP_SECRET } = require("../configs/index");

// Utility functions
const generateSalt = async () => {
  return await bcrypt.genSalt();
};

const generatePassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
};

const validatePassword = async (enteredPassword, savedPassword, salt) => {
  const hashedPassword = await generatePassword(enteredPassword, salt);
  return hashedPassword === savedPassword;
};

const generateSignature = async (payload) => {
  try {
    return await jwt.sign(payload, APP_SECRET, { expiresIn: "7d" });
  } catch (error) {
    console.log(error);
    return error;
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
  generateSalt,
  generatePassword,
  validatePassword,
  generateSignature,
  formatData,
};
