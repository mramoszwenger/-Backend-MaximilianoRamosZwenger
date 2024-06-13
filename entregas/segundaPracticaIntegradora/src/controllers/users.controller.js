import UserManagerMongo from '../dao/usersManagerMongo.js';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/index.js';

const userManager = new UserManagerMongo();

const userController = {
  async registerUser(request, response) {
    const { email, password } = request.body;
    try {
      const user = await userManager.createUser({ ...request.body, email, password });
      response.json({ status: 'success', message: 'Usuario registrado', user });
    } catch (error) {
      response.status(500).json({ status: 'error', message: error.message });
    }
  },

  async loginUser(request, response) {
    const { email, password } = request.body;
    try {
      const user = await userManager.authenticateUser(email, password);
      if (!user) {
        response.status(401).json({ status: 'error', message: 'Las credenciales son incorrectas' });
      } else {
      const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: '1h' });
      response.json({ status: 'success', message: 'Usuario loguedo', user });
      }
    } catch (error) {
      response.status(500).json({ status: 'error', message: error.message });
    }
  }
};

export default userController;