import UserManagerMongo from '../dao/usersDaoMongo.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/index.js';

const userManager = new UserManagerMongo();

const userController = {
  async registerUser(request, response) {
    const { first_name, last_name, age, email, password } = request.body;
    console.log('Request body:', request.body);
    try {
      const user = await userManager.createUser({ first_name, last_name, age, email, password });
      console.log('User created:', user);
      response.json({ status: 'success', message: 'Usuario registrado', user });
    } catch (error) {
      console.error('Error al registrar usuario:', error);
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
      const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
      response.json({ status: 'success', message: 'Usuario loguedo', user });
      }
    } catch (error) {
      response.status(500).json({ status: 'error', message: error.message });
    }
  }
};

export default userController;