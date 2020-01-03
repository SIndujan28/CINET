import { Router } from 'express';

import * as userController from './user.controller';

const routes = new Router();

routes.post('/signup', userController.signup);
routes.post('/login', userController.login);

export default routes;

