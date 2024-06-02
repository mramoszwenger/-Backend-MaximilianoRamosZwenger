const authMiddleware = (request, response, next) => {
    if (!request.session.user) {
      return response.redirect('/login');
    }
    next();
  };
  
  export default authMiddleware;