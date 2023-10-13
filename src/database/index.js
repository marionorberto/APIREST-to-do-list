import Sequelize from 'sequelize';
import dbConfig from '../config/database';
import User from '../models/User';
import Task from '../models/Task';

const models = [User, Task];
const connection = new Sequelize(dbConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
