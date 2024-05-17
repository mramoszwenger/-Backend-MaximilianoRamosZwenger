// import CartManager from '../dao/cartsManager.js';
import CartManager from '../dao/cartsManagerMongo.js';

// const path = './src/files/Cart.json';
const cartManager = new CartManager();

const cartController = {
  async getCart(request, response) {
    try {
      const { cid } = request.params;
      const cart = cid ? await cartManager.getCart(cid) : await cartManager.getCarts();
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
      const { quantity } = request.body;
      const cart = await cartManager.addProductToCart(cid, { product: pid, quantity: quantity || 1 });
      if (!cart) {
        return response.status(404).send('Carrito no encontrado');
      }
      response.json(cart);
    } catch (error) {
      response.status(500).send('Error al agregar producto al carrito');
    }
  },

  async removeProductFromCart(request, response) {
    try {
      const { cid, pid } = request.params;
      const updatedCart = await cartManager.removeProduct(cid, pid);
      if (!updatedCart) {
        return response.status(404).send('Carrito no encontrado');
      }
      response.json(cart);
    } catch (error) {
      response.status(500).send('Error al eliminar el producto del carrito');
    }
  },

  async updateCart(request, response) {
    try {
      const { cid } = request.params;
      const { products } = request.body;
      const updatedCart = await cartManager.updateCart(cid, products);
      if (!updatedCart) {
        return response.status(404).send('Carrito no encontrado');
      }
      response.json(updatedCart);
    } catch (error) {
      response.status(500).send('Error al actualizar el carrito');
    }
  },

  async updateProductQuantity(request, response) {
    try {
      const { cid, pid } = request.params;
      const { quantity } = request.body;
      const updatedCart = await cartManager.updateProductQuantity(cid, pid, quantity);
      if (!updatedCart) {
        return response.status(404).send('Carrito no encontrado');
      }
      response.json(updatedCart);
    } catch (error) {
      response.status(500).send('Error al actualizar la cantidad del producto en el carrito');
    }
  },

  async clearCart(request, response) {
    try {
      const { cid } = request.params;
      const clearedCart = await cartManager.clearAllProducts(cid);
      if (!clearedCart) {
        return response.status(404).send('Carrito no encontrado');
      }
      response.json(clearedCart);
    } catch (error) {
      response.status(500).send('Error al vaciar el carrito');
    }
  }
};

export default cartController;