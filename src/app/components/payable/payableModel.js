import Sequelize, { Model } from 'sequelize';

class Payable extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        transaction_id: Sequelize.INTEGER,
        payment_status: Sequelize.STRING,
        payment_date: Sequelize.DATEONLY,
        amount: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.belongsTo(models.Transaction, { foreignKey: 'transaction_id' });
  }
}

export default Payable;
