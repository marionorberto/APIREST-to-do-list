// import Task from '../models/Task';
import Task from '../models/Task';
import User from '../models/User';

class UserController {
  // index
  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'username', 'email', 'created_at'] });

      if (!users) {
        return res.status(400).json({
          errors: ['no users found'],
        });
      }

      return res.status(200).json(users);
    } catch (e) {
      return res.status(400).json(e.errors.map((err) => err.message));
    }
  }

  async store(req, res) {
    try {
      if (!req.body) return;
      const {
        id, username, email, created_at,
      } = await User.create(req.body);

      return res.status(200).json({
        id, username, email, created_at,
      });
    } catch (e) {
      return res.status(400).json(e.errors.map((err) => err.message));
    }
  }

  async show(req, res) {
    try {
      const user = await User.findOne({
        where: { id: req.userId },
        order: [['id', 'DESC'], [Task, 'id', 'DESC']],
        include: {
          model: Task,
          attributes: ['id', 'task', 'created_at'],
        },
      });

      if (!user) {
        return res.status(400).json(null);
      }
      const {
        id, username, email, Tasks,
      } = user;
      return res.status(200).json({
        id, username, email, Tasks,
      });
    } catch (e) {
      return res.status(400).json(e.errors.map((err) => err.message));
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);
      if (!user) {
        return res.status(401).json(null);
      }

      const newData = await user.update(req.body);

      const {
        id, username, email, password, updated_at,
      } = newData;

      return res.status(200).json({
        id, username, email, password, updated_at,
      });
    } catch (err) {
      console.log(err);
      return res.status(401).json(err);
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json(null);
      }
      await user.destroy(req.userId);
      return res.status(200).json({
        state: `user:${req.id} deleted`,
      });
    } catch (e) {
      return res.status(400).json(e.errors.map((err) => err.message));
    }
  }
}

export default new UserController();
