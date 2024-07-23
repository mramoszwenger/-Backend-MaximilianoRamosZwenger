import { Router } from 'express';
import userController from '../../controllers/users.controller.js';

const usersRouter = Router();

usersRouter.post('/register', userController.registerUser);

export default usersRouter;