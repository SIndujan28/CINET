import passport from 'passport';
import HTTPStatus from 'http-status';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import User from './../modules/user/user.model';

const requiredSignin = function (req, res, next) {
  passport.authenticate('jwt', { session: false }, (error, user, info) => {
    if (error || !user) {
      const err = {};
      err.message = 'please re sign-in';
      err.error = 'unauth';
      return res.status(401).json(err);
    }
    if (req.profile._id.toString() !== user._id.toString()) {
      const err = {};
      err.message = 'illegal operation';
      err.error = 'unathorized entry';
      return res.status(401).json(err);
    }
    next();
  })(req, res, next);
};

const signin = function (req, res) {
  User.findOne({
    email: req.body.email,
  }, (err, user) => {
    if (err || !user) {
      return res.status(HTTPStatus.NOT_FOUND).json({
        error: 'User not found',
      });
    }
    if (!user.authenticatePassword(req.body.password)) {
      return res.status(HTTPStatus.UNAUTHORIZED).json({
        error: "Password and Email doesn't match",
      });
    }
    const token = jwt.sign({
      _id: user._id,
    }, 'piss off mon for being selfish');
    res.cookie('t', token, {
      expire: new Date() + 9999,
    });
    return res.status(HTTPStatus.ACCEPTED).json({ token, user: { _id: user._id, name: user.name, email: user.email } });
  });
};
const signout = function (req, res) {
  res.clearCookie('t');
  return res.status(HTTPStatus.OK).json({
    message: 'Signed out',
  });
};
const requireSignin = expressJwt({
  secret: 'piss off mon for being selfish',
  userProperty: 'auth',
});
const hasAuthorization = function (req, res, next) {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) {
    return res.status(HTTPStatus.UNAUTHORIZED).json({
      error: 'User is not authorized',
    });
  }
  next();
};
export { requiredSignin, signin, signout, requireSignin, hasAuthorization };
