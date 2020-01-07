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

export function create(req, res) {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(HTTPStatus.BAD_REQUEST).json({
        error: 'image could not be uploaded',
      });
    }
    const post = new Post(fields);
    post.postedBy = req.profile;
    if (files.photo) {
      post.photo.data = fs.readFileSync(files.photo.path);
      post.photo.contentType = files.photo.type;
    }
    post.save((error, result) => {
      if (err) {
        return res.status(HTTPStatus.BAD_REQUEST).json(error);
      }
      return res.status(HTTPStatus.CREATED).json(result);
    });
  }
  );
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

export async function checkPoster(req, res, next) {
  const isPoster = req.auth && req.post && req.post.postedBy._id == req.auth._id;
  if (!isPoster) {
    return res.status(HTTPStatus.UNAUTHORIZED).json({
      error: 'User is not authorized to perform the action',
    });
  }
  next();
}

export async function like(req, res) {
  try {
    const post = await Post.findByIdAndUpdate(req.body.postId, { $push: { likes: req.body.userId } }, { new: true });
    return res.status(HTTPStatus.OK).json(post);
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error);
  }
}

export async function unlike(req, res) {
  try {
    const post = await Post.findByIdAndUpdate(req.body.postId, { $pull: { likes: req.body.userId } }, { new: true });
    return res.status(HTTPStatus.OK).json(post);
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error);
  }
}

