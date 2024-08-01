import { Router } from 'express';
import userController from '../../controllers/users.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/', authMiddleware(['admin']), userController.getAllUsers);
router.get('/:uid', authMiddleware(['admin']), userController.getUserById);
router.put('/:uid', authMiddleware(['admin']), userController.updateUser);
router.delete('/:uid', authMiddleware(['admin']), userController.deleteUser);

export default router;