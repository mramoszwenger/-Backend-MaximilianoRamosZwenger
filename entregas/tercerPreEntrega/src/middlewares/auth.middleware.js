import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/index.js';

const authMiddleware = (roles = []) => {
  return (request, response, next) => {
    const token = request.cookies.jwt;
    if (!token) {
      return response.status(401).json({ status: 'error', message: 'No se encontró token' });
    }

    jwt.verify(token, JWT_SECRET, (error, decoded) => {
      if (error) {
        return response.status(401).json({ status: 'error', message: 'Token incorrecto' });
      }

      request.user = decoded;

      if (roles.length && !roles.includes(request.user.role)) {
        return response.status(403).json({ status: 'error', message: 'Acceso denegado' });
      }

      next();
    });
  };
};

export default authMiddleware;