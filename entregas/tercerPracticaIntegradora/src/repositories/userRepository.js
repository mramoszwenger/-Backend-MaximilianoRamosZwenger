import DAOFactory from '../factories/factory.js';

class UserRepository {
  constructor() {
    this.userDAO = DAOFactory.getDAO('user');
  }

  async getUserById(id) {
    return this.userDAO.getUserById(id);
  }
}

export default new UserRepository();