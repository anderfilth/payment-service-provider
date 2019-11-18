import Transaction from './transactionModel';
import * as transactionValidations from './transactionValidations';
import transactionRepositoryImport from './transactionRepository';
import transactionTransform from './transactionTransform';

const transactionRepository = transactionRepositoryImport(Transaction);

exports.store = async (req, res) => {
  try {
    await transactionValidations.validateStore(req.body);
  } catch (err) {
    return res.status(err.statusCode).json(err.validationErrors);
  }

  const newTransaction = await transactionRepository.store({
    ...req.body,
    user_id: req.userId,
  });

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
