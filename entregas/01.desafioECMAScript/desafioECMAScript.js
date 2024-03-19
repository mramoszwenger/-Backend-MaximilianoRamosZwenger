class ProductManager {
    constructor() {
        this.products = [];
        this.productIdCounter = 1;
    }

    addProduct(product) {

        // Validar que todos los campos sean obligatorios
        const requiredFields = ['title', 'description', 'price', 'thumbnail', 'code', 'stock'];
        const allFields = requiredFields.every(field => product.hasOwnProperty(field) && product[field]);
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
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (product) {
            return product;
        } else {
            console.error('Producto no encontrado.');
        }
    }
}


const productManager = new ProductManager();

// Ejemplos

productManager.addProduct({
    title: 'Disco Solido SSD 240GB',
    description: 'SSD 240GB 2.5 SATA III Kingstone A400 lectura hasta 500MB Y escritura hasta 450MB',
    price: 38840,
    thumbnail: 'img/ssda400-240gb.jpg',
    code: 'SSDK240',
    stock: 722
});

productManager.addProduct({
    title: 'Disco Solido SSD 480GB',
    description: 'SSD 480GB 2.5 SATA III Kingstone A400 lectura hasta 500MB Y escritura hasta 450MB',
    price: 47790,
    thumbnail: 'img/ssda400-480gb.jpg',
    code: 'SSDK480',
    stock: 137
});

productManager.addProduct({
    title: 'Pendrive 64GB',
    description: 'Kingstone DataTraveler Exodia DTX USB 3.2',
    price: 9080,
    thumbnail: 'img/datatravel-64gb.jpg',
    code: 'PDK64GB',
    stock: 1394
});

productManager.addProduct({
    title: 'Pendrive 128GB',
    description: 'Kingstone DataTraveler Exodia DTX USB 3.2',
    price: 14830,
    thumbnail: 'img/datatravel-128gb.jpg',
    code: 'PDK128GB',
    stock: 516
});

productManager.addProduct({
    title: 'Pendrive 256GB',
    description: 'Kingstone DataTraveler Exodia DTX USB 3.2',
    price: 32700,
    thumbnail: 'img/datatravel-256gb.jpg',
    code: 'PDK256GB',
    stock: 9
});

// Obtener todos los productos
console.log('Todos los productos:', productManager.getProducts());

// Obtener un producto por id
console.log('Producto con id 2:', productManager.getProductById(2));