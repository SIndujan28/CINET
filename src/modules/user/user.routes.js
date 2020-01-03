import { Router } from 'express';

import * as userController from './user.controller';
import { authLocal } from './../../services/auth.service';

const routes = new Router();

routes.param('userId', userController.userById);
routes.post('/signup', userController.signup);
routes.post('/login', authLocal, userController.login);
routes.get('/list', userController.list);
routes.get('/:userId', userController.read);
routes.delete('/:userId', userController.remove);
routes.put('/:userId', userController.update);
export default routes;

