import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import UserManagerMongo from '../dao/usersManagerMongo.js';

const userService = new UserManagerMongo();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'wh@tsA$3cr3T'
};

export const initializePassport = () => {
  passport.use('register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, email, password, done) => {
    try {
      const user = await userService.createUser({ email, password });
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
        return done(null, false, { message: 'Invalid email or password' });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));

  passport.use(new GitHubStrategy({
    clientID: 'Iv23lifig732UoB8lvLJ',
    clientSecret: 'eb7fecf77b37d6f89eb9ef32092081f163b25429',
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

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    const user = await User.findById(jwt_payload.id);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
}));

export default passport;