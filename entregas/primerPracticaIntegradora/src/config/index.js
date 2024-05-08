import { connect } from 'mongoose'

export const connectDb = () => {
    console.log('Base de Datos Conectada')
    connect('mongodb+srv://mramoszwenger:C0d3R-d@7e@ecommerce.o4nmbry.mongodb.net/ecommerce_mrz?retryWrites=true&w=majority&appName=ecommerce')
}