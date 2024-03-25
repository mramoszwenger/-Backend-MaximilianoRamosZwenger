const { error } = require('node:console');
const fs = require('node:fs')

class ProductManager {
    constructor(path) {
        this.path = path
        this.initialized = false;
        this.products = [];
        this.productIdCounter = 1;
        this.init()
    }

    async init() {
        try {
            const dataJson = await fs.promises.readFile(this.path, 'utf-8');

            // Verificar si el archivo JSON está vacío
            if (!dataJson.trim()) {
                this.products = [];
            } else {
                this.products = JSON.parse(dataJson);

                if (this.products.length > 0) {
                    this.productIdCounter = Math.max(...this.products.map(product => product.id)) + 1;
                }
            }

            this.initialized = true;
        } catch (error) {
            console.error('Error al inicializar:', error);
        }
    }

    readFile = async () => {
        try {
            const dataJson = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(dataJson)
        } catch(error) {
            return []
        }
    }

    addProduct = async (product) => {
        try {

            // Validar que todos los campos sean obligatorios
            const requiredFields = ['title', 'description', 'price', 'thumbnail', 'code', 'stock'];
            const allFields = requiredFields.every(field => product.hasOwnProperty(field) && (product[field] !== undefined && product[field] !== ''));
            if (!allFields) {
                console.error('Todos los campos son obligatorios.');
                return;
            }

            // Validar que no se repita el campo "code"
            const uniqueCode = this.products.every(existingProduct => existingProduct.code !== product.code);
            if (!uniqueCode) {
                console.error('El código del producto ya existe.');
                return;
            }

            // Asignar un id autoincrementable al producto y agregarlo
            product.id = this.productIdCounter++;
            this.products.push(product);
            console.log('Producto agregado:', product);

            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'), 'utf-8')

            return this.products

        } catch(error) {
            console.error(error)
        }
    }

    getProducts = async () => {
        try {
            return this.products;
        } catch(error) {
            console.error(error)
        }
    }

    getProductById = async (id) => {
        try {

            const product = this.products.find(product => product.id === id);
            if (!product) {
              return 'Producto no encontrado.'  
            }

            return product;

        } catch(error) {
            console.error(error)
        }
    }

    updateProduct = async (id, productToUpdate) => {
        try {
            const findProduct = this.products.findIndex(product => product.id === id)
            if (findProduct === -1) {
                console.log('Producto no encontrado');
            }
            this.products[findProduct] = { ...this.products[findProduct], ...productToUpdate }
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'), 'utf-8');
            return this.products[findProduct]
        } catch (error) {
            console.error('Error al actualizar el producto:', error)
        }
    }

    deleteProduct = async (id) => {
        try {
        const findProduct = this.products.findIndex(product => product.id === id);
        if (findProduct === -1) {
            console.error('Error: Producto no encontrado');
            return null;
        }

        const deletedProduct = this.products.splice(index, 1)[0];
        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'), 'utf-8');
        return deletedProduct;

        } catch(error) {
            console.log(error)
        }
    }
}

module.exports = {
    ProductManager
}