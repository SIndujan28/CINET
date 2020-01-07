import { Router } from 'express';
import * as postController from './post.controller';
import { userById } from './../user/user.controller';

const routes = new Router();

routes.param('userId', userById);
routes.param('postId', postController.postById);
routes.get('/feed/:userId', postController.listNewsFeed);
routes.get('/by/:userId', postController.listByUser);
routes.get('/photo/:postId', postController.photo);
routes.delete('/:postId', postController.checkPoster, postController.remove);
routes.put('/new/:userId', postController.create);
routes.put('/like', postController.like);
routes.put('/unlike', postController.unlike);

export default routes;
