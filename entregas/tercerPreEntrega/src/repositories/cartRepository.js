import DAOFactory from '../factories/factory.js';

class CartRepository {
  constructor() {
    this.cartDAO = DAOFactory.getDAO('cart');
  }

  async getCartById(id) {
    return this.cartDAO.getCartById(id);
  }
}

export default new CartRepository();