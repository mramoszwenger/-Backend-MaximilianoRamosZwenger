import { Router } from 'express';
import userController from '../controllers/users.controller.js';

const sessionsRouter = Router();

sessionsRouter.post('/login', userController.loginUser);
sessionsRouter.get('/logout', userController.logoutUser);

export default sessionsRouter;