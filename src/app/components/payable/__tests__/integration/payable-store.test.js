import moment from 'moment';

import truncate from '../../../../util/truncate';
import Payable from '../../payableModel';
import User from '../../../user/userModel';
import Transaction from '../../../transaction/transactionModel';
import payableRepositoryImport from '../../payableRepository';

const payableRepository = payableRepositoryImport(Payable);

describe('Payable', () => {
  let user;
  let transaction;
  beforeEach(async () => {
    await truncate();
    user = await User.create({
      name: 'John Johnson',
      email: 'example@example.com',
      password: '123456',
    });
    transaction = await Transaction.create({
      user_id: user.id,
      description: 'Smartband XYZ 3.0',
      amount: 10000,
      payment_method: 'credit_card',
      card_number: '4111111111111111',
      card_name: 'John Johnson',
      card_expiration_date: '1022',
      card_cvv: '123',
    });
  });

  it('should make a payable using repository', async () => {
    const dbTransaction = await payableRepository.getDbTransaction();
    const payable = await payableRepository.store({
      data: {
        user_id: user.id,
        transaction_id: transaction.id,
        payment_status: 'paid',
        amount: 9700,
        payment_date: moment(),
      },
      dbTransaction,
    });
    await payableRepository.commitDbTransaction({ dbTransaction });
    expect(payable).toHaveProperty('id');
    expect(payable).toHaveProperty('user_id');
    expect(payable).toHaveProperty('transaction_id');
    expect(payable).toHaveProperty('payment_status');
    expect(payable).toHaveProperty('amount');
    expect(payable).toHaveProperty('payment_date');
  });
});
