import CartManager from '../managers/cartManager.js';

const path = './src/files/Cart.json';
const cartManager = new CartManager(path);

const cartController = {
  async getCart(request, response) {
    try {
      const { cid } = request.params;
      const cart = await cartManager.getCart(cid);
      if (!cart) {
        return response.status(404).send('Carrito no encontrado');
      }
      response.json(cart);
    } catch (error) {
      response.status(500).send('Error al obtener el carrito');
    }
  },

  async createCart(request, response) {
    try {
      const newCart = await cartManager.createCart();
      response.json(newCart);
    } catch (error) {
      response.status(500).send('Error al crear el carrito');
    }
  },

  async addProductToCart(request, response) {
    try {
      const { cid, pid } = request.params;
      const cart = await cartManager.addProductToCart(cid, { product: pid, quantity: 1 });
      if (!cart) {
        return response.status(404).send('Carrito no encontrado');
      }
      response.json(cart);
    } catch (error) {
      response.status(500).send('Error al agregar producto al carrito');
    }
  }
};

export default cartController;