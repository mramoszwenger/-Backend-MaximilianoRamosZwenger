import { Router } from 'express';

const router = Router();

router.get('/', (request, response) => {
  response.render('index');
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

  response.render('home', {
    user: request.session.user,
  });
});

export default router;