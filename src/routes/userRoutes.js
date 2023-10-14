import { Router } from 'express';
import UserController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

const route = new Router();

// route.get('/users', loginRequired, UserController.index); // not needed
route.post('/users/store', UserController.store);
route.get('/users/show', loginRequired, UserController.show);
route.put('/users/update', loginRequired, UserController.update);
route.delete('/users/delete', loginRequired, UserController.delete);

export default route;
