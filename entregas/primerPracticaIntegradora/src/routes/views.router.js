import { Router } from 'express';

const router = Router();

const products = [];

router.get('/', async (request, response) => {
    response.render('index.hbs')
})

export default router