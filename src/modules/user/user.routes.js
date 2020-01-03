import { Router } from 'express';

import * as userController from './user.controller';
import { authLocal, authJwt } from './../../services/auth.service';

const routes = new Router();

routes.param('userId', userController.userById);
routes.post('/signup', userController.signup);
routes.post('/login', authLocal, userController.login);
routes.get('/list', userController.list);
routes.get('/:userId', authJwt, userController.read);
routes.delete('/:userId', authJwt, userController.remove);
routes.put('/:userId', authJwt, userController.update);
export default routes;

