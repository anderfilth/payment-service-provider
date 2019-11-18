import Payable from './payableModel';
import payableTransform from './payableTransform';
import payableRepositoryImport from './payableRepository';

const payableRepository = payableRepositoryImport(Payable);

exports.index = async (req, res) => {
  const getBalance = await payableRepository.index({
    user_id: req.userId,
  });

  return res.status(200).json(payableTransform.balance(getBalance));
};
