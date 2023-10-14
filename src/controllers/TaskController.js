import Task from '../models/Task';

class TaskController {
  async index(req, res) {
    try {
      const tasks = await Task.findAll({ attributes: ['id', 'task', 'user_id'], order: ['DESC'] });
      if (!tasks) {
        return req.status(400).json({
          errors: ['No Tasks found'],
        });
      }
      return res.status(200).json(tasks);
    } catch (err) {
      return res.status(400).json(err.erros.map((e) => e.message));
    }
  }

  async store(req, res) {
    try {
      const { userId } = req;
      const {
        id, task, user_id, created_at,
      } = await Task.create({ ...req.body, user_id: userId });

      return res.status(200).json({
        id, task, user_id, created_at,
      });
    } catch (err) {
      return res.status(400).json(err.errors.map((e) => e.message));
    }
  }

  async show(req, res) {
    try {
      const taskShow = await Task.findByPk(req.userId);
      if (!taskShow) {
        return res.status(404).json('Nothing Found');
      }

      const {
        id, task, user_id, created_at,
      } = taskShow;
      return res.status(200).json({
        id, task, user_id, created_at,
      });
    } catch (err) {
      return res.status(400).json(err.errors.map((e) => e.message));
    }
  }

  async update(req, res) {
    try {
      const gotTask = await Task.findByPk(req.userId);

      if (!gotTask) {
        return res.status(400).json({
          errors: ['user not found'],
        });
      }

      const {
        id, task, user_id, updated_at,
      } = await gotTask.update(req.body);

      return res.status(200).json({
        id, task, user_id, updated_at,
      });
    } catch (err) {
      return res.status(400).json(err.errors.map((e) => e.message));
    }
  }

  async delete(req, res) {
    try {
      const task = await Task.findByPk(req.userId);
      if (!task) {
        return res.status(400).json({
          errors: ['user not found'],
        });
      }

      await task.destroy(req.userId);
      return res.status(200).json({
        state: 'user delete successfully',
      });
    } catch (err) {
      return res.status(400).json(err.errors.map((e) => e.message));
    }
  }
}

export default new TaskController();
