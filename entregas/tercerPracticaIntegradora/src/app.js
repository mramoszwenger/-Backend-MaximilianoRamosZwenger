import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import productsRouter from './routes/product.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import usersRouter from './routes/users.router.js';
import sessionsRouter from './routes/sessions.router.js';
import { PORT } from './config.js';
import {__dirname} from './utils.js';

// motor de plantilla
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';

// const path = './file/Products.json';
import { connectDB, sessionSecret } from './config/index.js';
import MongoStore from 'connect-mongo'

// passport 
import cookieParser from 'cookie-parser';
import passport from 'passport'
import { initializePassport } from './config/passport.js'

const app = express();

const httpServer = app.listen(PORT || 8080, error => {
    if(error) console.log(error)
    console.log(`Server escuchando en el puerto ${PORT}`)
})

// socket server
const socketServer = new Server(httpServer);

// Lectura del JSON
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname+'/public'));
app.use(cookieParser());

// Middleware para sesiones
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Usa secure: true si tu aplicación usa HTTPS
  }));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

initializePassport();

connectDB()

// Motor de plantillas
app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}))

// Dirección de las vistas (plantillas)
app.set('views', __dirname+'/views');
app.set('view engine', 'hbs');

// console.log('Adding routes');

app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/users', usersRouter);
app.use('/api/sessions', sessionsRouter);

// Manejo de errores
app.use((error, request, response, next) => {
    console.error(error);
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