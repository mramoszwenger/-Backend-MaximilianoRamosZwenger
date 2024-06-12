import UserManagerMongo from '../dao/usersManagerMongo.js';

const userManager = new UserManagerMongo();

const userController = {
  async registerUser(request, response) {
    const { email, password } = request.body;
    try {
      const user = await userManager.createUser({ email, password });
      response.json({ status: 'success', message: 'User registered', user });
    } catch (error) {
      response.status(500).json({ status: 'error', message: error.message });
    }
  },

  async loginUser(request, response) {
    const { email, password } = request.body;
    try {
      const user = await userManager.authenticateUser(email, password);
      if (!user) {
        response.status(401).json({ status: 'error', message: 'Invalid credentials' });
      } else {
        res.json({ status: 'success', message: 'User logged in', user });
      }
    } catch (error) {
      response.status(500).json({ status: 'error', message: error.message });
    }
  }
};

export default userController;