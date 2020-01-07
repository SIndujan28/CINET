import { Router } from 'express';
import * as postController from './post.controller';
import { userById } from './../user/user.controller';
import { requireSignin } from './../../services/valid.service';

const routes = new Router();

routes.param('userId', userById);
routes.param('postId', postController.postById);
routes.get('/feed/:userId', requireSignin, postController.listNewsFeed);
routes.get('/by/:userId', requireSignin, postController.listByUser);
routes.get('/photo/:postId', postController.photo);
routes.delete('/:postId', requireSignin, postController.checkPoster, postController.remove);
routes.put('/new/:userId', requireSignin, postController.create);
routes.put('/like', requireSignin, postController.like);
routes.put('/unlike', requireSignin, postController.unlike);
routes.put('/comment', requireSignin, postController.addComment);
routes.put('/uncomment', requireSignin, postController.removeComment);

export default routes;
