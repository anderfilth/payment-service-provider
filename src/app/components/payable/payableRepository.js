import sequelize from 'sequelize';
import db from '../../../database';

const conn = db.getConnection();

const store = Payable => ({ data, transaction = undefined }) => {
  return Payable.create(data, transaction);
};

const index = Payable => ({ user_id }) => {
  return Payable.findAll({
    attributes: [
      'payment_status',
      [sequelize.fn('sum', sequelize.col('amount')), 'total'],
    ],
    group: ['Payable.payment_status'],
    raw: true,
    where: {
      user_id,
    },
  });
};

const getDbTransaction = async () => {
  return conn.transaction();
};

const commitDbTransaction = async ({ dbTransaction }) => {
  await dbTransaction.commit();
};

export default Payable => ({
  store: store(Payable),
  index: index(Payable),
  getDbTransaction,
  commitDbTransaction,
});
