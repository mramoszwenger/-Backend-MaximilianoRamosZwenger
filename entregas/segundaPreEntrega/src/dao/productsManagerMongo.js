import {productModel} from './models/products.model.js'

class ProductManagerMongo {
    constructor() {
        this.productModel = productModel;
    }

    addProduct = async (product) => {
        try {
            // Validar que todos los campos sean completados
            if (!product.title || !product.description || !product.thumbnail || !product.price || !product.stock || !product.code) {
                throw new Error('Todos los campos son obligatorios.');
            }

            // Validar que el código del producto no exista en otro producto
            const existingProduct = await this.productModel.findOne({ code: product.code });
            if (existingProduct) {
                throw new Error('El código del producto ya existe.');
            }

            const newProduct = new this.productModel(product);
            await newProduct.save();
            return newProduct;
        } catch (error) {
            console.error('Error al agregar el producto:', error);
        }
    }

    getProducts = async () => {
        try {
            return await this.productModel.find({});
        } catch (error) {
            console.error('Error al obtener los productos:', error);
            return [];
        }
    }

    getProductById = async (pid) => {
        try {
            return await this.productModel.findOne({ pid: pid });
        } catch (error) {
            console.error('Error al obtener el producto por ID:', error);
            return null;
        }
    }

    updateProduct = async (pid, productToUpdate) => {
        try {
            return await this.productModel.findOneAndUpdate({ pid: pid }, productToUpdate, { new: true });
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            return null;
        }
    }

    deleteProduct = async (pid) => {
        try {
            return await this.productModel.findOneAndDelete({ pid: pid });
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            return null;
        }
    }
}

export default ProductManagerMongo;