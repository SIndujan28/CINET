import { Router } from 'express';
import * as postController from './post.controller';
import { userById } from './../user/user.controller';

const routes = new Router();

routes.param('userId', userById);
routes.get('/feed/:userId', postController.listNewsFeed);
routes.get('/by/:userId', postController.listByUser);

export default routes;
