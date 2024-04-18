import express from 'express';
import productsRouter from './routes/product.router.js';
import cartsRouter from './routes/cart.router.js';
import {__dirname} from './utils.js';

// motor de plantilla
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'

const path = './file/Products.json';

const app = express();

const httpServer = app.listen(8080, error => {
    if(error) console.log(error)
    console.log('Server escuchando en el puerto 8080')
})

// socket server
const socketServer = new Server(httpServer)

// Lectura del JSON
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname+'/public'))

// Motor de plantillas
app.engine('handlebars', handlebars.engine())
// Dirección de las vistas (plantillas)
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

// Manejo de errores
app.use((request, response, next) => {
    console.log(error);
    response.status(500).send('Error 500 en el server');
});

// Manejo de conexión de WebSocket
socketServer.on('connection', (socket) => {
    console.log('Cliente conectado');

    // Lógica para enviar la lista de productos a través de WebSocket
    socket.on('getProducts', async () => {
        // Aquí obtienes la lista de productos y la envías al cliente
        const products = await productManager.getProducts();
        socket.emit('products', products);
    });
    
});