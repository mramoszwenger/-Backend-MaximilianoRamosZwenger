import { Router } from 'express';
// import UserManagerMongo from '../dao/usersManagerMongo.js';
import passport from 'passport'

const sessionsRouter = Router();

sessionsRouter.post('/register', passport.authenticate('register', {
    successRedirect: '/login',
    failureRedirect: '/register',
    failureFlash: true
}));
  
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

sessionsRouter.get('/logout', (request, response) => {
    request.session.destroy( err => {
        if(err) return response.send({status: 'error', error: err})
        else return response.redirect('/login')
    })
})

export default sessionsRouter;