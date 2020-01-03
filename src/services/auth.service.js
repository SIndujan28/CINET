import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

import User from './../modules/user/user.model';

const LocalOpts = {
  usernameField: 'email',
};

const localStrategy = new LocalStrategy(LocalOpts, async (email, password, done) => {
  try {
    const file = await User.findOne({ email });
    if (!file) {
      return done(null, false);
    } else if (!file.authenticatePassword(password)) {
      return done(null, false);
    }
    return done(null, file);
  } catch (error) {
    return done(error, false);
  }
});

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'piss off mom for being selfish',
};

const jwtStrategy = new JWTStrategy(jwtOpts, async (payload, done) => {
  try {
    const user = await User.findById(payload._id);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});
passport.use(localStrategy);
passport.use(jwtStrategy);

export const authLocal = passport.authenticate('local', { session: false });
export const authJwt = passport.authenticate('jwt', { session: false });
