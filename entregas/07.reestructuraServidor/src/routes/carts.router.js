import { Router } from "express";
import cartController from '../controllers/carts.controller.js';

const router = Router();

// router.get('/', cartController.getCart);
router.get('/:cid', cartController.getCart);
router.post('/', cartController.createCart);
router.post('/:cid/products/:pid', cartController.addProductToCart);
router.delete('/:cid/products/:pid', cartController.removeProductFromCart);
router.put('/:cid', cartController.updateCart);
router.put('/:cid/products/:pid', cartController.updateProductQuantity);
router.delete('/:cid', cartController.clearCart);

export default router;