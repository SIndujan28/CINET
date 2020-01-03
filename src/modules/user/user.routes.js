import { Router } from 'express';

import * as userController from './user.controller';
import { authLocal } from './../../services/auth.service';

const routes = new Router();

routes.post('/signup', userController.signup);
routes.post('/login', authLocal, userController.login);
export default routes;

