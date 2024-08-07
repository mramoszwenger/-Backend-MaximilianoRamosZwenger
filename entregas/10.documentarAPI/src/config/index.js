import {connect} from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'wh@tsA$3cr3T';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecommerce_mrz';
const SESSION_SECRET = process.env.SESSION_SECRET || 't$@S3CR3T';

// Conexión Base de Datos
export const connectDB = () => {
    console.log('Base de Datos Conectada')
    connect(
        MONGO_URI, {          
    }).then(() => console.log("Conexión exitosa"))
    .catch((error) => console.error("Error conectando a la base de datos:", error));
};

// Exportar el secreto de la sesión
export const sessionSecret = SESSION_SECRET;

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