import ProductManagerMongo from '../dao/porductsManagerMongo.js';
// import ProductManager from '../dao/productsManager.js';
import {} from '../dao/models/products.model.js';

// const path = './src/files/Products.json';
const productManager = new ProductManagerMongo();

const productController = {
  async getAllProducts(request, response) {
    try {
      let productList = await productManager.getProducts();
      if (request.query.limit) {
        productList = productList.slice(0, Number(request.query.limit));
      }
      response.json(productList);
    } catch (error) {
      response.status(500).send('Error al obtener los productos');
    }
  },

  async getProductById(request, response) {
    const pid = Number(request.params.pid);
    try {
      const product = await productManager.getProductById(pid);
      if (!product) {
        return response.status(404).send('Producto no encontrado');
      }
      response.json(product);
    } catch (error) {
      response.status(500).send('Error al obtener producto por ID');
    }
  },

  async addProduct(request, response) {
    try {
      const product = await productManager.addProduct(request.body);
      if (!product) {
        return response.status(400).send('Todos los campos son obligatorios.');
      }
      response.status(201).send(product);
    } catch (error) {
      response.status(500).send('Error al agregar el producto');
    }
  },

  async updateProduct(request, response) {
    const pid = Number(request.params.pid);
    try {
      const updatedProduct = await productManager.updateProduct(pid, request.body);
      if (!updatedProduct) {
        return response.status(404).send('Producto no encontrado');
      }
      response.send(updatedProduct);
    } catch (error) {
      response.status(500).send('Error al actualizar el producto');
    }
  },

  async deleteProduct(request, response) {
    const pid = Number(request.params.pid);
    try {
      const deletedProduct = await productManager.deleteProduct(pid);
      if (!deletedProduct) {
        return response.status(404).send('Producto no encontrado');
      }
      response.send(deletedProduct);
    } catch (error) {
      response.status(500).send('Error al eliminar el producto');
    }
  }
};

export default productController;