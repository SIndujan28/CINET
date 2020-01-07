import HTTPStatus from 'http-status';

import Post from './post.model';

export async function listNewsFeed(req, res) {
  try {
    const following = req.profile.following;
    following.push(req.profile._id);
    const posts = await Post.find({ postedBy: { $in: following } })
      .populate('comments', 'text created')
      .populate('comments.postedBy', '_id userName')
      .populate('postedBy', '_id userName')
      .sort('-createdAt');
    return res.status(HTTPStatus.OK).json(posts);
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error);
  }
}

export async function listByUser(req, res) {
  try {
    const posts = await Post.find({ postedBy: req.profile._id })
      .populate('comments', 'text created')
      .populate('comments.postedBy', '_id userName')
      .populate('postedBy', '_id userName')
      .sort('-createdAt');
    return res.status(HTTPStatus.OK).json(posts);
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error);
  }
}

export function photo(req, res) {
  res.set('Content-Type', req.post.photo.contentType);
  return res.send(req.post.photo.data);
}

export async function postById(req, res, next, id) {
  try {
    const post = await Post.findById(id).populate('postedBy', '_id userName');
    req.post = post;
    next();
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error);
  }
}

