import {connect} from 'mongoose';

export const connectDB = () => {
    console.log('Base de Datos Conectada')
    connect('mongodb://127.0.0.1:27017/ecommerce_mrz')
    //connect('mongodb+srv://mramoszwenger:C0d3R-d@7e@ecommerce.o4nmbry.mongodb.net/ecommerce_mrz?retryWrites=true&w=majority&appName=ecommerce')
}