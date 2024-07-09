import DAOFactory from '../factories/daoFactory';

class CartRepository {
  constructor() {
    this.cartDAO = DAOFactory.getDAO('cart');
  }

  async getCartById(id) {
    return this.cartDAO.getCartById(id);
  }
}

export default new CartRepository();