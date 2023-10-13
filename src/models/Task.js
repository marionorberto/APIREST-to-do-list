import Sequelize, { Model } from 'sequelize';

export default class Task extends Model {
  static init(sequelize) {
    super.init({
      task: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: {
          msg: 'task is already registered',
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    }, {
      sequelize, tableName: 'tasks',
    });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}
