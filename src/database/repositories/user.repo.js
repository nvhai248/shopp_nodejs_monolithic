const { UserModel } = require("../models");

class UserRepository {
  constructor() {
    this.model = new UserModel();
  }

  createNewUser = (userInfo) => {
    return "OK";
  };
}

module.exports = UserRepository;
