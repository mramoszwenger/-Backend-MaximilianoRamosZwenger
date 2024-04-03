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
            let productList = await ProductManager.getProducts();
            if(request.query.limit) {
                products = products.slice(0, Number(request.query.limit));
            }
            response.json(productList);
        } catch(error) {
            response.status(500).send('Error al obtener los productos')
        }
    });

    app.get('products/:pid', async (request, response) => {
        try {
            const { pid } = request.params;
            const product = await productsManager.getProductById(Number(pid));
            if (!product) {
                return response.status(404).send('Producto no encontrado');
            }
            res.json(product); 
        } catch(error) {
            res.status(500).send('Error al obtener producto por ID');
        }       
    });

    app.listen(8080, error => {
        console.log('server escuchando en puerto 8080');
    });

})







/*

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
*/


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