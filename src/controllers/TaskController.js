import Task from '../models/Task';

class TaskController {
  async index(req, res) {
    try {
      const tasks = await Task.findAll();
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
      const task = await Task.create(req.body);

      return res.status(200).json(task);
    } catch (err) {
      return res.status(400).json(err.errors.map((e) => e.message));
    }
  }

  async show(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['No id especified'],
        });
      }

      const task = await Task.findByPk(req.params.id);
      if (!task) {
        return res.status(404).json('Nothing Found');
      }
      return res.status(200).json(task);
    } catch (err) {
      return res.status(400).json(err.errors.map((e) => e.message));
    }
  }

  async update(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['No id especified'],
        });
      }
      const task = await Task.findByPk(req.params.id);

      if (!task) {
        return res.status(400).json({
          errors: ['user not found'],
        });
      }

      const userUpdated = await task.update(req.body);

      return res.status(200).json(userUpdated);
    } catch (err) {
      return res.status(400).json(err.errors.map((e) => e.message));
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['No id especified'],
        });
      }

      const task = await Task.findByPk(req.params.id);
      if (!task) {
        return res.status(400).json({
          errors: ['user not found'],
        });
      }

      await task.destroy(req.params.id);
      return res.status(200).json({
        state: 'user delete successfully',
      });
    } catch (err) {
      return res.status(400).json(err.errors.map((e) => e.message));
    }
  }
}

export default new TaskController();
