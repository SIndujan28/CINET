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

export default routes;
