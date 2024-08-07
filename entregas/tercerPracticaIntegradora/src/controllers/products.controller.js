import ProductManagerMongo from '../daos/mongo/productsDaoMongo.js';
import {} from '../models/products.model.js';

const productManager = new ProductManagerMongo();

class productController {

  constructor() {
    console.log('ProductController instantiated');
  }

  getAllProducts = async (request, response) => {
    console.log('getAllProducts called');
    try {
      const { limit = 10, page = 1, sort, query } = request.query;
      const filters = query ? { $or: [{ category: query }, { availability: query }] } : {};
      const options = {
        limit: parseInt(limit),
        page: parseInt(page),
        sort: sort ? { price: sort === 'asc' ? 1 : -1 } : {},
      };

      const result = await productManager.getProducts(filters, options);
      const { docs, totalDocs, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage } = result;

      response.json({
        status: 'success',
        payload: docs,
        totalPages,
        prevPage,
        nextPage,
        page: options.page,
        hasPrevPage,
        hasNextPage,
        prevLink: hasPrevPage ? `/api/products?limit=${limit}&page=${prevPage}&sort=${sort}&query=${query}` : null,
        nextLink: hasNextPage ? `/api/products?limit=${limit}&page=${nextPage}&sort=${sort}&query=${query}` : null,
      });
    } catch (error) {
      response.status(500).send('Error al obtener los productos');
    }
  }

  getProductById = async (request, response) => {
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
  }

  addProduct = async (request, response) => {
    try {
      const product = await productManager.addProduct(request.body);
      if (!product) {
        return response.status(400).send('Todos los campos son obligatorios.');
      }
      response.status(201).send(product);
    } catch (error) {
      response.status(500).send('Error al agregar el producto');
    }
  }

  updateProduct = async (request, response) => {
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
  }

  deleteProduct = async (request, response) => {
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

export default new productController();