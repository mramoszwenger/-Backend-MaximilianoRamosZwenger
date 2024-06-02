import UserManagerMongo from '../dao/usersManagerMongo.js';

const userManager = new UserManagerMongo();

const userController = {
  async registerUser(request, response) {
    try {
      const user = await userManager.createUser(request.body);
      response.status(201).send(user);
    } catch (error) {
      response.status(500).send('Error al registrar el usuario');
    }
  },

  async loginUser(request, response) {
    try {
      const { email, password } = request.body;
      const user = await userManager.authenticateUser(email, password);
      if (!user) {
        return response.status(401).send('Email o contraseña incorrectos');
      }

      request.session.user = {
        email: user.email,
        role: user.role,
      };

      response.redirect('/api/products');
    } catch (error) {
      response.status(500).send('Error al iniciar sesión');
    }
  },

  async logoutUser(request, response) {
    request.session.destroy((err) => {
      if (err) {
        return response.status(500).send('Error al cerrar sesión');
      }
      response.redirect('/login');
    });
  }
};

export default userController;
