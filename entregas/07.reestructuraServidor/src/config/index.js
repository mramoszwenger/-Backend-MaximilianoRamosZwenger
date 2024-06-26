import {connect} from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || 'wh@tsA$3cr3T';
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecommerce_mrz'

// Conexión Base de Datos
export const connectDB = () => {
    console.log('Base de Datos Conectada')
    connect(
        // connect('mongodb://mramoszwenger:C0d3R-d@7e@ecommerce.o4nmbry.mongodb.net/ecommerce_mrz?retryWrites=true&w=majority&appName=ecommerce')
        MONGO_URI, {
    })
};

// Generar Token JWT
export const generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, {
      expiresIn: '1h',
    });
  };
  
// Verificación del Token
export const verifyToken = (token) => {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      console.error('Token invalido o expirado');
      return null;
    }
  };