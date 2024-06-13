import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/index.js'

const authMiddleware = (request, response, next) => {

    const token = request.cookies.jwt;
    if (!token) {
      return res.status(401).json({ status: 'error', message: 'No encontro token' });
    }

    jwt.verify(token, jwtSecret, (error, decoded) => {
      if (error) {
        return response.status(401).json({ status: 'error', message: 'Token incirrecto' });
      }
      request.user = decoded;
      next();
    });

  };
  
export default authMiddleware;