import { Router } from 'express';
import passport from 'passport';
import userController from '../controllers/users.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import { passportCall } from '../utils/passportCall.js';
import { atuhorization } from '../utils/authorizationJwt.js';

const sessionsRouter = Router();

sessionsRouter.post('/register', userController.registerUser);
  
sessionsRouter.post('/login', passport.authenticate('login', {
    successRedirect: '/products',
    failureRedirect: '/login',
    failureFlash: true
}));

sessionsRouter.get('/github', passport.authenticate('github', {scope: 'user:email'}), async (request, response) => {})

sessionsRouter.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), (request,response) => {
    request.session.user = request.user
    response.redirect('/')
})

sessionsRouter.get('/current', passportCall('jwt'), atuhorization('admin'), (request, response) => {
    logger.info(request.user)
    response.send('datos sensibles')
})

sessionsRouter.get('/logout', (request, response) => {
    request.logout(error => {
        if(error) return response.send({status: 'error', error: error})
        response.redirect('/login')
    })
})

export default sessionsRouter;
