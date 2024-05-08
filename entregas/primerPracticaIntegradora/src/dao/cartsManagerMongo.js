import { cartModel } from './models/carts.model.js';

class CartManager {
    constructor() {}

    getCarts = async () => {
        try {
            return await cartModel.find({});
        } catch (error) {
            console.error('Error al obtener los carritos:', error);
            return [];
        }
    }

    getCart = async (cid) => {
        try {
            return await cartModel.findOne({ cid: cid });
        } catch (error) {
            console.error('Error al obtener el carrito:', error);
            return null;
        }
    }

    createCart = async () => {
        try {
            const cid = Math.floor(Math.random() * 1000); // Genera un ID aleatorio
            const newCart = await cartModel.create({ cid: cid, products: [] });
            return newCart;
        } catch (error) {
            console.error('Error al crear el carrito:', error);
            return null;
        }
    }

    addProductToCart = async (cid, product) => {
        try {
            const cart = await cartModel.findOne({ cid: cid });
            if (!cart) {
                console.error('El carrito no existe');
                return null;
            }
            const existingProductIndex = cart.products.findIndex(item => item.product === product.product);
            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].quantity += product.quantity;
            } else {
                cart.products.push(product);
            }
            await cart.save();
            return cart;
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
            return null;
        }
    }
}

export default CartManager;