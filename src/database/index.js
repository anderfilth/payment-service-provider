import Sequelize from 'sequelize';

import User from '../app/core/models/User';
import Transaction from '../app/core/models/Transaction';
import Payable from '../app/core/models/Payable';

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
