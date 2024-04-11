import { Router } from "express";
import CartManager from "../managers/cartManager.js";

const router = Router();
const path = './src/file/Cart.json';
const carts = new CartManager(path);

router.get('/:cid', async (request, response) => {});
router.post('/', async (request, response) => {});

router.post('/:cid/products/:pid', async (request, response) => {
    const {cid, pid} =request.params
    const response = await carts.addProductToCart(cid, {product:pid, quantity: 1});
});