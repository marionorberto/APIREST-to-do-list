import dotenv from 'dotenv';

dotenv.config();

import './database/index';
import express from 'express';
import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';
import tokenRoutes from './routes/tokenRoutes';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  routes() {
    this.app.use(userRoutes);
    this.app.use(taskRoutes);
    this.app.use(tokenRoutes);
  }
}

export default new App().app;
