const { Router } = require('express');
const { uploader } = require('../utils/multer');
const router = new Router()

router.get('/', (request, response) => {
    response.render('index')
});

router.get('/login', (request, response) => {
    response.render('index')
});

router.get('/register', (request, response) => {
    response.render('index')
});

router.get('/products', (request, response) => {
    response.render('index')
});

router.get('/profile', (request, response) => {
    response.render('index')
});

router.post('/upload-file', uploader.single('myfile'), (request, response) => {
    response.render('succesFile')
});

module.exports = router