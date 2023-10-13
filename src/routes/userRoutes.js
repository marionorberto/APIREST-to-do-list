import { Router } from 'express';
import UserController from '../controllers/UserController';

const route = new Router();

route.get('/users', UserController.index);
route.post('/users/store', UserController.store);
route.put('/users/:id/update', UserController.update);
route.get('/users/:id/show', UserController.show);
route.delete('/users/:id/delete', UserController.delete);

export default route;
