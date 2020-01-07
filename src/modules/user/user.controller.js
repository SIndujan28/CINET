import HTTPStatus from 'http-status';
import _ from 'lodash';
import formidable from 'formidable';
import fs from 'fs';
import User from './user.model';

export async function signup(req, res) {
  try {
    const user = await User.create(req.body);
    return res.status(HTTPStatus.CREATED).json(user.toAuthJSON());
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error);
  }
}

export async function login(req, res, next) {
  res.status(HTTPStatus.OK).json(req.user.toAuthJSON());
  next();
}

export async function list(req, res) {
  try {
    const users = await User.find({}, 'email userName createdAt updatedAt');
    return res.status(HTTPStatus.OK).json(users);
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error);
  }
}

export async function userById(req, res, next, id) {
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(HTTPStatus.NOT_FOUND).json('Not found');
    }
    req.profile = user;
    next();
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json('User not found');
  }
}
export async function read(req, res) {
  req.profile.password = undefined;
  return res.status(HTTPStatus.OK).json(req.profile);
}

export async function remove(req, res) {
  try {
    const user = req.profile;
    await user.remove();
    return res.status(HTTPStatus.OK).json('User deleted');
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error);
  }
}

export async function update(req, res) {
  try {
    let user = req.profile;
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(HTTPStatus.NOT_ACCEPTABLE).json({
          error: 'Photo could not be uploaded ',
        });
      }
      user = _.extend(user, fields);
      if (files.photo) {
        user.photo.data = fs.readFileSync(files.photo.path);
        user.photo.contentType = files.photo.type;
      }
    });
    await user.save();
    return res.status(HTTPStatus.ACCEPTED).json(user);
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error);
  }
}

export async function photo(req, res, next) {
  if (req.profile.photo.data) {
    res.set('Content-Type', req.profile.photo.contentType);
    return res.send(req.profile.photo.data);
  }
  next();
}

