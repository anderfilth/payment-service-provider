import Sequelize, { Model } from 'sequelize';

import transactionFee from './transactionFee';

class Transaction extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        description: Sequelize.STRING,
        amount: Sequelize.INTEGER,
        fee: Sequelize.INTEGER,
        payment_method: Sequelize.STRING,
        status: Sequelize.STRING,
        card_number: Sequelize.VIRTUAL,
        card_last_number: Sequelize.STRING,
        card_name: Sequelize.STRING,
        card_expiration_date: Sequelize.STRING,
        card_cvv: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    this.addHook('beforeCreate', async transaction => {
      transaction.card_last_number = transaction.card_number.substr(
        transaction.card_number.length - 4
      );
      transaction.fee =
        transaction.amount * transactionFee[transaction.payment_method];
      transaction.status = 'authorized';
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.hasMany(models.Payable, { foreignKey: 'transaction_id' });
  }
}

export default Transaction;
