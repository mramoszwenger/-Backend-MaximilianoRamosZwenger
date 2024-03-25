const { error } = require('node:console');
const fs = require('node:fs')

class ProductManager {
    constructor(path) {
        this.path = path
        this.init()
    }

    static async create(path) {
        const manager = new ProductManager(path);
        await manager.init();
        return manager;
    }

    async init () {
        this.products = await this.readFile();
        this.productIdCounter = this.products.reduce((max, product) => Math.max(max, product.id), 0) + 1;
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

    updateProduct = async (id, productToUpdate) => {}

    deleteProduct = async (id) => {}
}

module.exports = {
    ProductManager
}