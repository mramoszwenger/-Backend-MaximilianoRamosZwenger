import { Router } from 'express';
//import ProductManager from '../managers/productManager.js';

const router = Router();
const path = './src/file/Products.json'
const products = new ProductManager(path);

router.get('/', async (request, response) => {
    try{
        let productList = await products.getProducts();
        if(request.query.limit) {
            productList = productList.slice(0, Number(request.query.limit));
        }
        response.json(productList);
    } catch(error) {
        response.status(500).send('Error al obtener los productos')
    }
});

router.get('/products/:pid', async (request, response) => {
    try {
        const { pid } = request.params;
        const product = await products.getProductById(Number(pid));
        if (!product) {
            return response.status(404).send('Producto no encontrado');
        }
        response.json(product); 
    } catch(error) {
        response.status(500).send('Error al obtener producto por ID');
    }       
});

export default router;