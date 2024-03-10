const { UserRepository } = require("../database");

class UserService {
  constructor() {
    this.repository = new UserRepository();
  }

  SignIn(username, password) {
    return this.repository.createNewUser(null);
  }
}

module.exports = UserService;
