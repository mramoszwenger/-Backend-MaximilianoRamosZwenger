import UserManagerMongo from '../daos/mongo/usersDaoMongo.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

const userManager = new UserManagerMongo();

class userController {
  registerUser = async (request, response) => {
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
  }

  loginUser = async (request, response) => {
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

  getUserById = async (request, response) => {
    const { uid } = request.params;
    try {
      const user = await userManager.getUserBy({ _id: uid });
      if (!user) {
        response.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
      } else {
        response.json({ status: 'success', user });
      }
    } catch (error) {
      response.status(500).json({ status: 'error', message: error.message });
    }
  }

  getAllUsers = async (req, res) => {
    try {
      const users = await userManager.getAllUsers();
      res.json({ status: 'success', users });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  updateUser = async (request, response) => {
    const { uid } = request.params;
    const userUpdates = request.body;
    try {
      const user = await userManager.updateUser(uid, userUpdates);
      if (!user) {
        response.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
      } else {
        response.json({ status: 'success', message: 'Usuario actualizado', user });
      }
    } catch (error) {
      response.status(500).json({ status: 'error', message: error.message });
    }
  }

  deleteUser = async (request, response) => {
    const { uid } = request.params;
    try {
      const result = await userManager.deleteUser(uid);
      if (!result) {
        response.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
      } else {
        response.json({ status: 'success', message: 'Usuario eliminado' });
      }
    } catch (error) {
      response.status(500).json({ status: 'error', message: error.message });
    }
  }

};

export default new userController();