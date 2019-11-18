import Sequelize from 'sequelize';

import User from '../app/components/user/userModel';
import Transaction from '../app/components/transaction/transactionModel';
import Payable from '../app/components/payable/payableModel';

import databaseConfig from '../config/database';

const models = [User, Transaction, Payable];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  getConnection() {
    return this.connection;
  }
}

export default new Database();
