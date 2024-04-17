import express from 'express';
import productsRouter from './routes/product.router.js';
import cartsRouter from './routes/cart.router.js';

const path = './file/Products.json';

const app = express();

// Lectura del JSON
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

app.use((request, response, next) => {
    console.log(error);
    response.status(500).send('Error 500 en el server');
});

app.listen(8080, error => {
    if(error) console.log(error);
    console.log('server escuchando en puerto 8080');
});