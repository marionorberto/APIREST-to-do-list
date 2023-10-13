import { Router } from 'express';
import TaskController from '../controllers/TaskController';

const route = new Router();

route.get('/tasks', TaskController.index);
route.post('/tasks/store', TaskController.store);
route.get('/tasks/:id/show', TaskController.show);
route.put('/tasks/:id/update', TaskController.update);
route.delete('/tasks/:id/delete', TaskController.delete);

export default route;
