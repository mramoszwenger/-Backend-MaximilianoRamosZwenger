import DAOFactory from '../factories/factory.js';

class ProductRepository {
  constructor() {
    this.productDAO = DAOFactory.getDAO('product');
  }

  async getProductById(id) {
    return this.productDAO.getProductById(id);
  }
}

export default new ProductRepository();