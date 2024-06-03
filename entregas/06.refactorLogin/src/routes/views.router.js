import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', authMiddleware, (request, response) => {
  response.render('home');
});

router.get('/login', (request, response) => {
  response.render('login');
});

router.get('/register', (request, response) => {
  response.render('register');
});

router.get('/products', (request, response) => {
  if (!request.session.user) {
    return response.redirect('/login');
  }

});

export default router;