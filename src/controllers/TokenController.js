import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import User from '../models/User';

class TokenController {
  async store(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        errors: ['invalid credentials'],
      });
    }

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(400).json({
          errors: ['invalid email'],
        });
      }

      if (!(await bcryptjs.compare(password, user.password_hash))) {
        return res.status(400).json({
          errors: ['password invalid'],
        });
      }

      const { id } = user;
      const token = jwt.sign(
        { id, email },
        process.env.TOKEN_SECRET,
        { expiresIn: process.env.TOKEN_EXPIRATION },
      );

      return res.status(200).json({
        token,
      });
    } catch (e) {
      return res.status(400).json({
        errors: ['token invalid'],
      });
    }
  }
}

export default new TokenController();
