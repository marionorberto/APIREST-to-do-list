import User from '../models/User';

class UserController {
  async index(req, res) {
    try {
      const users = await User.findAll();

      if (!users) {
        return res.status(400).json({
          errors: ['no users found'],
        });
      }

      return res.status(200).json(users);
    } catch (e) {
      return res.status(400).json(e.errors.map((error) => error.message));
    }
  }

  async store(req, res) {
    try {
      if (!req.body) return;
      const user = await User.create(req.body);

      return res.status(200).json(user);
    } catch (e) {
      return res.status(400).json(e.errors.map((error) => error.message));
    }
  }

  async show(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['no id especified'],
        });
      }
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(400).json({
          errors: ['no user found'],
        });
      }

      return res.status(200).json(user);
    } catch (e) {
      return res.status(400).json(e.errors.map((error) => error.message));
    }
  }

  async update(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['no id especified'],
        });
      }
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(400).json({
          errors: 'user not found',
        });
      }

      const userUpdated = await user.update(req.body);
      return res.status(200).json(userUpdated);
    } catch (e) {
      return res.status(400).json(e.errors.map((error) => error.message));
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['no id especified'],
        });
      }
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(400).json({
          errors: ['No user found'],
        });
      }
      await user.destroy(req.params.id);
      return res.status(200).json({
        state: `user ${req.params.id} deleted`,
      });
    } catch (e) {
      return res.status(400).json(e.errors.map((error) => error.message));
    }
  }
}

export default new UserController();
