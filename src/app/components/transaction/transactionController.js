import Transaction from './transactionModel';
import Payable from '../payable/payableModel';
import * as transactionValidations from './transactionValidations';
import transactionRepositoryImport from './transactionRepository';
import payableRepositoryImport from '../payable/payableRepository';
import transactionTransform from './transactionTransform';
import transactionFee from './transactionFee';
import payableDate from '../payable/payableDate';
import payableStatus from '../payable/payableStatus';

const transactionRepository = transactionRepositoryImport(Transaction);
const payableRepository = payableRepositoryImport(Payable);

exports.store = async (req, res) => {
  try {
    await transactionValidations.validateStore(req.body);
  } catch (err) {
    return res.status(err.statusCode).json(err.validationErrors);
  }

  const dbTransaction = await transactionRepository.getDbTransaction();

  const newTransaction = await transactionRepository.store({
    data: {
      ...req.body,
      user_id: req.userId,
    },
    dbTransaction,
  });

  const payableData = {
    user_id: req.userId,
    transaction_id: newTransaction.id,
  };

  const fee =
    newTransaction.amount * transactionFee[newTransaction.payment_method];

  await payableRepository.store({
    data: {
      ...payableData,
      payment_status: payableStatus[newTransaction.payment_method],
      amount: newTransaction.amount - fee,
      payment_date: payableDate[newTransaction.payment_method],
    },
    dbTransaction,
  });

  // commit transaction
  await transactionRepository.commitDbTransaction({ dbTransaction });

  return res
    .status(201)
    .json(transactionTransform.transactionOne(newTransaction));
};

exports.index = async (req, res) => {
  const { limit, offset, id } = req.query;

  const transactionsList = await transactionRepository.index({
    id,
    limit,
    offset,
    user_id: req.userId,
  });

  return res
    .status(200)
    .json(transactionTransform.transactions(transactionsList));
};
