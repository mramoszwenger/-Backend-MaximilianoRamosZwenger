import DAOFactory from '../factories/daoFactory';

class UserRepository {
  constructor() {
    this.userDAO = DAOFactory.getDAO('user');
  }

  async getUserById(id) {
    return this.userDAO.getUserById(id);
  }
}

export default new UserRepository();