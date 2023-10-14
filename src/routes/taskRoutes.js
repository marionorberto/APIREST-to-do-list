import { Router } from 'express';
import TaskController from '../controllers/TaskController';
import loginRequired from '../middlewares/loginRequired';

const route = new Router();

// route.get('/tasks', TaskController.index); // not need
route.post('/tasks/store', loginRequired, TaskController.store);
route.get('/tasks/show', loginRequired, TaskController.show);
route.put('/tasks/update', loginRequired, TaskController.update);
route.delete('/tasks/delete', loginRequired, TaskController.delete);

export default route;
