import userDAO from '../daos/userDAO';
import productDAO from '../daos/productDAO';
import cartDAO from '../daos/cartDAO';

class DAOFactory {
  static getDAO(type) {
    switch (type) {
      case 'user':
        return userDAO;
      case 'product':
        return productDAO;
      case 'cart':
        return cartDAO;
      default:
        throw new Error('DAO type not supported');
    }
  }
}

export default DAOFactory;