import { Op } from 'sequelize';
import db from '../../../database';

const conn = db.getConnection();

const store = Transaction => ({ data, dbTransaction }) => {
  return Transaction.create(data, dbTransaction);
};

const index = Transaction => ({ id, user_id, limit, offset }) => {
  const andWhere = [];
  andWhere.push({
    user_id,
  });
  if (id) {
    andWhere.push({
      id,
    });
  }
  return Transaction.findAndCountAll({
    limit,
    offset,
    where: { [Op.and]: andWhere },
  });
};

const getDbTransaction = async () => {
  return conn.transaction();
};

const commitDbTransaction = async ({ dbTransaction }) => {
  await dbTransaction.commit();
};

const rollbackDbTransaction = async ({ dbTransaction }) => {
  await dbTransaction.rollback();
};

export default Transaction => ({
  store: store(Transaction),
  index: index(Transaction),
  getDbTransaction,
  commitDbTransaction,
  rollbackDbTransaction,
});
