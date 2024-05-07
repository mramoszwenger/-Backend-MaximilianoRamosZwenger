import { Router } from "express";
import cartController from '../../controllers/cart.controller.js';

const router = Router();

router.get('/:cid', cartController.getCart);
router.post('/', cartController.createCart);
router.post('/:cid/products/:pid', cartController.addProductToCart);

export default router;