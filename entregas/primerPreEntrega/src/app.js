const express = require('express');
const { ProductManager } = require('./ProductManager.js');
const path = './file/Products.json';

const app = express();

// Lectura del JSON
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const products = new ProductManager(path);

products.init().then(() => {
    console.log('ProductManager inicializado');

    // Endpoints

    app.get('/products', async (request, response) => {
        try{
            let productList = await products.getProducts();
            if(request.query.limit) {
                productList = productList.slice(0, Number(request.query.limit));
            }
            response.json(productList);
        } catch(error) {
            response.status(500).send('Error al obtener los productos')
        }
    });

    app.get('/products/:pid', async (request, response) => {
        try {
            const { pid } = request.params;
            const product = await products.getProductById(Number(pid));
            if (!product) {
                return response.status(404).send('Producto no encontrado');
            }
            response.json(product); 
        } catch(error) {
            response.status(500).send('Error al obtener producto por ID');
        }       
    });

    app.listen(8080, error => {
        console.log('server escuchando en puerto 8080');
    });

})

/* const main = async () => {
    try {
        // Agregar producto de prueba
        const response = await products.addProduct({
            title: 'Procesador Intel I9-10GEN',
            description: 'Procesador Intel Comet Lake I9-10900 3.7GHZ a 5.1GHZ, con 10 nucleos 20 hilos, 20MB de cache. Socket 1200. Solo Windows 64 bits. Con cooler y video integrado',
            price: 554460,
            thumbnail: 'img/intel-i9-10900.jpg',
            code: 'PI910900',
            stock: 1
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

main() */


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

    title: 'Procesador Intel I3-10GEN',
    description: 'Procesador Intel Comet Lake I3-10105 3.7GHZ a 4.4GHZ, con 4 nucleos 8 hilos, 6MB de cache. Socket 1200. Solo Windows 64 bits. Con cooler y video integrado',
    price: 166010,
    thumbnail: 'img/intel-i3-10105.jpg',
    code: 'PI310105',
    stock: 6

    title: 'Procesador Intel I5-11GEN',
    description: 'Procesador Intel Comet Lake I5-11400 2.6GHZ a 4.4GHZ, con 6 nucleos 12 hilos. Socket 1200. Solo Windows 64 bits. Con cooler y video integrado',
    price: 297950,
    thumbnail: 'img/intel-i5-11400.jpg',
    code: 'PI511400',
    stock: 7

    title: 'Procesador Intel I7-11GEN',
    description: 'Procesador Intel Comet Lake I7-11700 2.5GHZ a 4.9GHZ, con 8 nucleos 16 hilos, 12MB de cache. Socket 1200. Solo Windows 64 bits. Con cooler y video integrado',
    price: 380870,
    thumbnail: 'img/intel-i7-11700.jpg',
    code: 'PI711700',
    stock: 16

    title: 'Procesador Intel I9-10GEN',
    description: 'Procesador Intel Comet Lake I9-10900 3.7GHZ a 5.1GHZ, con 10 nucleos 20 hilos, 20MB de cache. Socket 1200. Solo Windows 64 bits. Con cooler y video integrado',
    price: 554460,
    thumbnail: 'img/intel-i9-10900.jpg',
    code: 'PI910900',
    stock: 1
*/