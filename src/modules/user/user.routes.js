import { Router } from 'express';

import * as userController from './user.controller';
import { authLocal, authJwt } from './../../services/auth.service';
import { requiredSignin, requireSignin, hasAuthorization, signin, signout } from './../../services/valid.service';

const routes = new Router();

routes.param('userId', userController.userById);
routes.post('/signup', userController.signup);
routes.post('/login', signin);
routes.get('/signout', signout);
routes.get('/list', userController.list);
routes.get('/:userId', [requireSignin], userController.read);
routes.delete('/:userId', [requireSignin, hasAuthorization], userController.remove);
routes.put('/:userId', [requireSignin, hasAuthorization], userController.update);
routes.get('/photo/:userId', userController.photo);
routes.put('/follow', userController.addFollowing, userController.addFollower);
routes.put('/follow', userController.removeFollowing, userController.removeFollower);
export default routes;

