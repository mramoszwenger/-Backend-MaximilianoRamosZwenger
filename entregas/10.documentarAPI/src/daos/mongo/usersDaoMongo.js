import bcrypt from 'bcrypt';
import { userModel } from '../../models/users.model.js';

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

  async getAllUsers() {
    try {
      return await userModel.find();
    } catch (error) {
      console.log('Error al obtener usuarios:', error);
      throw error;
    }
  }

  async getUserById(id) {
    try {
      return await userModel.findById(id);
    } catch (error) {
      console.log('Error al obtener usuario por ID:', error);
      throw error;
    }
  }

  async updateUser(id, userData) {
    try {
      return await userModel.findByIdAndUpdate(id, userData, { new: true });
    } catch (error) {
      console.log('Error al actualizar usuario:', error);
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      return await userModel.findByIdAndDelete(id);
    } catch (error) {
      console.log('Error al eliminar usuario:', error);
      throw error;
    }
  }
}

export default UserManagerMongo;