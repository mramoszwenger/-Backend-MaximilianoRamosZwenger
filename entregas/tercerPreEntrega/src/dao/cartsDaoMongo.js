import { cartsModel } from '../models/carts.model.js';

class CartManager {
    constructor() {}

    getCarts = async () => {
        try {
            return await cartsModel.find({});
        } catch (error) {
            console.error('Error al obtener los carritos:', error);
            return [];
        }
    }

    getCart = async (cid) => {
        try {
            return await cartsModel.findOne({ cid: cid });
        } catch (error) {
            console.error('Error al obtener el carrito:', error);
            return null;
        }
    }

    createCart = async () => {
        try {
            const cid = Math.floor(Math.random() * 1000); // Genera un ID aleatorio
            const newCart = await cartsModel.create({ cid: cid, products: [] });
            return newCart;
        } catch (error) {
            console.error('Error al crear el carrito:', error);
            return null;
        }
    }

    addProductToCart = async (cid, product) => {
        try {
            const cart = await cartsModel.findOne({ cid: cid });
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

    removeProductFromCart = async (cid, pid) => {
        try {
          const cart = await cartsModel.findById(cid);
          if (!cart) {
            console.error('El carrito no existe');
            return null;
          }
          cart.products = cart.products.filter(item => !item.product.equals(pid));
          await cart.save();
          return cart;
        } catch (error) {
          console.error('Error al eliminar producto del carrito:', error);
          return null;
        }
      }
    
      updateCart = async (cid, products) => {
        try {
          const cart = await cartsModel.findById(cid);
          if (!cart) {
            console.error('El carrito no existe');
            return null;
          }
          cart.products = products;
          await cart.save();
          return cart;
        } catch (error) {
          console.error('Error al actualizar el carrito:', error);
          return null;
        }
      }
    
      updateProductQuantity = async (cid, pid, quantity) => {
        try {
          const cart = await cartsModel.findById(cid);
          if (!cart) {
            console.error('El carrito no existe');
            return null;
          }
          const product = cart.products.find(item => item.product.equals(pid));
          if (!product) {
            console.error('El producto no existe en el carrito');
            return null;
          }
          product.quantity = quantity;
          await cart.save();
          return cart;
        } catch (error) {
          console.error('Error al actualizar la cantidad del producto en el carrito:', error);
          return null;
        }
      }
    
      clearCart = async (cid) => {
        try {
          const cart = await cartsModel.findById(cid);
          if (!cart) {
            console.error('El carrito no existe');
            return null;
          }
          cart.products = [];
          await cart.save();
          return cart;
        } catch (error) {
          console.error('Error al vaciar el carrito:', error);
          return null;
        }
      }
}

export default CartManager;