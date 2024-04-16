import { Router } from 'express';
import ProductManager from '../managers/productManager.js';

const router = Router();
const path = './src/files/Products.json';
const productManager = new ProductManager(path);

router.get('/', async (request, response) => {
    try {
        let productList = await productManager.getProducts();
        if (request.query.limit) {
            productList = productList.slice(0, Number(request.query.limit));
        }
        response.json(productList);
    } catch (error) {
        response.status(500).send('Error al obtener los productos: ');
    }
});

router.get('/:pid', async (request, response) => {
    const pid = Number(request.params.pid);
    try {
        const product = await productManager.getProductById(pid);
        if (!product) {
            return response.status(404).send('Producto no encontrado');
        }
        response.json(product);
    } catch (error) {
        response.status(500).send('Error al obtener producto por ID: ');
    }
});

router.post('/', async (request, response) => {
    try {
        const product = await productManager.addProduct(request.body);
        response.status(201).send(product);
    } catch (error) {
        response.status(500).send('Error al agregar el producto: ');
    }
});

router.put('/:pid', async (request, response) => {
    const pid = Number(request.params.pid);
    try {
        const updatedProduct = await productManager.updateProduct(pid, request.body);
        if (!updatedProduct) {
            return response.status(404).send('Producto no encontrado');
        }
        response.send(updatedProduct);
    } catch (error) {
        response.status(500).send('Error al actualizar el producto: ');
    }
});

router.delete('/:pid', async (request, response) => {
    const pid = Number(request.params.pid);
    try {
        const deletedProduct = await productManager.deleteProduct(pid);
        if (!deletedProduct) {
            return response.status(404).send('Producto no encontrado');
        }
        response.send(deletedProduct);
    } catch (error) {
        response.status(500).send('Error al eliminar el producto: ');
    }
});

export default router;