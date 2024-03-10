const bcrypt = require("bcrypt");

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

module.exports = {
  generateSalt,
  generatePassword,
  validatePassword,
};
