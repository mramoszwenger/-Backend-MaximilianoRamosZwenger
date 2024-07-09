import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

const authMiddleware = (request, response, next) => {

    const token = request.cookies.jwt;
    if (!token) {
      return response.status(401).json({ status: 'error', message: 'No encontro token' });
    }

    jwt.verify(token, JWT_SECRET, (error, decoded) => {
      if (error) {
        return response.status(401).json({ status: 'error', message: 'Token incorrecto' });
      }
      request.user = decoded;
      next();
    });

  };
  
export default authMiddleware;