const { ProductManager } = require('./ProductManager.js');
const path = './file/Products.json';

const main = async () => {
    try {
        const products = new ProductManager(path);

        // Agregar producto de prueba
        const response = await products.addProduct({
            title: 'Disco Solido SSD 240GB',
            description: 'SSD 240GB 2.5 SATA III Kingstone A400 lectura hasta 500MB Y escritura hasta 450MB',
            price: 38840,
            thumbnail: 'img/ssda400-240gb.jpg',
            code: 'SSDK240',
            stock: 722
        })

        console.log('Se ha agregado el producto:', response);

        // Obtener todos los productos
        console.log('Lista de productos:', products.getProducts());

        // Obtener un producto por id
        console.log('Producto con por id:', products.getProductById(2));

    } catch(error) {
        console.error(error);
    }

}

main()



/* Ejemplos de productos

    title: 'Disco Solido SSD 240GB',
    description: 'SSD 240GB 2.5 SATA III Kingstone A400 lectura hasta 500MB Y escritura hasta 450MB',
    price: 38840,
    thumbnail: 'img/ssda400-240gb.jpg',
    code: 'SSDK240',
    stock: 722

    title: 'Disco Solido SSD 480GB',
    description: 'SSD 480GB 2.5 SATA III Kingstone A400 lectura hasta 500MB Y escritura hasta 450MB',
    price: 47790,
    thumbnail: 'img/ssda400-480gb.jpg',
    code: 'SSDK480',
    stock: 137

    title: 'Pendrive 64GB',
    description: 'Kingstone DataTraveler Exodia DTX USB 3.2',
    price: 9080,
    thumbnail: 'img/datatravel-64gb.jpg',
    code: 'PDK64GB',
    stock: 1394

    title: 'Pendrive 128GB',
    description: 'Kingstone DataTraveler Exodia DTX USB 3.2',
    price: 14830,
    thumbnail: 'img/datatravel-128gb.jpg',
    code: 'PDK128GB',
    stock: 516

    title: 'Pendrive 256GB',
    description: 'Kingstone DataTraveler Exodia DTX USB 3.2',
    price: 32700,
    thumbnail: 'img/datatravel-256gb.jpg',
    code: 'PDK256GB',
    stock: 9
*/