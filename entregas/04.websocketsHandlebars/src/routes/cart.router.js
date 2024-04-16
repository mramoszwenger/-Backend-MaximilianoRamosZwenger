import { Router } from "express";
import CartManager from "../managers/cartManager.js";

const router = Router();
const path = './src/file/Cart.json';
const carts = new CartManager(path);

router.get('/:cid', async (request, response) => {
    try {
        const { cid } = request.params;
        const cart = await carts.getCart(cid);
        if (!cart) {
            return response.status(404).send('Carrito no encontrado');
        }
        response.json(cart);
    } catch(error) {
        response.status(500).send('Error al obtener el carrito');
    }    
});

router.post('/', async (request, response) => {
    try {
        const newCart = await carts.createCart();
        response.json(newCart);
    } catch(error) {
        response.status(500).send('Error al crear el carrito');
    }   
});

router.post('/:cid/products/:pid', async (request, response) => {
    try {
        const { cid, pid } = request.params;
        const cart = await carts.addProductToCart(cid, { product: pid, quantity: 1 });
        if (!cart) {
            return response.status(404).send('Carrito no encontrado');
        }
        response.json(cart);
    } catch (error) {
        response.status(500).send('Error al agregar producto al carrito');
    }
});

export default router;