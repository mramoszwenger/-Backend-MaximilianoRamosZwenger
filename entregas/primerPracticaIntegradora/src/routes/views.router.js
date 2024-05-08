import { Router } from 'express';

const router = Router();

router.get('/', async (request, response) => {
    response.render('index')
})

export default router