import { Op } from 'sequelize';

const store = Transaction => data => {
  return Transaction.create(data);
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

export default Transaction => ({
  store: store(Transaction),
  index: index(Transaction),
});
