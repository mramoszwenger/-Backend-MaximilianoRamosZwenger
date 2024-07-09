import bcrypt from 'bcrypt';
import { userModel } from '../models/users.model.js';

class UserManagerMongo {
  async createUser(userData) {
    try {
      const existingUser = await userModel.findOne({ email: userData.email });
      if (existingUser) {
        throw new Error('El correo ya está registrado');
      }

      if (userData.email === 'adminCoder@coder.com' && userData.password === 'adminCod3r123') {
        userData.role = 'admin';
      }

      const newUser = new userModel(userData);
      return await newUser.save();
    } catch(error) {
      console.log('Error al crear usuario:', error);
      throw error;
    }
  }

  async authenticateUser(email, password) {
    const user = await userModel.findOne({ email });
    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return null;
    }

    return user;
  }
}

export default UserManagerMongo;