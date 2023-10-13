import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init({
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 80],
            msg: 'username must have between 3 to 80 caracteres',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        unique: {
          msg: 'email already exists',
        },
        validate: {
          isEmail: {
            msg: 'invalid email',
          },
        },
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
        allowNull: false,
        validate: {
          len: {
            args: [8, 255],
            msg: 'password must have between 8 to 255 caracteres',
          },
        },
      },
    }, { sequelize, tableName: 'users' });
    this.addHook('beforeSave', async (user) => {
      user.password_hash = await bcryptjs.hash(user.password, 10);
    });
    return this;
  }
}
