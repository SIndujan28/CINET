import HTTPStatus from 'http-status';
import User from './user.model';

export async function signup(req, res) {
  try {
    const user = await User.create(req.body);
    return res.status(HTTPStatus.CREATED).json(user);
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error);
  }
}

export async function login(req, res, next) {
  res.status(HTTPStatus.OK).json(req.user);
  next();
}
