import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GitHubStrategy } from 'passport-github2';
import UserManagerMongo from '../dao/usersDaoMongo.js';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '../config.js';

const userService = new UserManagerMongo();

// console.log('GITHUB_CLIENT_ID:', GITHUB_CLIENT_ID);
// console.log('GITHUB_CLIENT_SECRET:', GITHUB_CLIENT_SECRET);

export const initializePassport = () => {
  passport.use('register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, async (request, email, password, done) => {
    try {
      const { first_name, last_name, age } = request.body;
      const user = await userService.createUser({ first_name, last_name, age, email, password });
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));

  passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, async (email, password, done) => {
    try {
      const user = await userService.authenticateUser(email, password);
      if (!user) {
        return done(null, false, { message: 'Correo o contraseña incorrecta' });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));

  passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
//    clientID: 'Iv23lifig732UoB8lvLJ',
//    clientSecret: 'eb7fecf77b37d6f89eb9ef32092081f163b25429',
    callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await userService.getUserBy({ email: profile._json.email });
      if (!user) {
        user = await userService.createUser({
          first_name: profile._json.name,
          last_name: profile._json.name,
          email: profile._json.email,
          password: ''
        });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userService.getUserBy({ _id: id });
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

export default passport;