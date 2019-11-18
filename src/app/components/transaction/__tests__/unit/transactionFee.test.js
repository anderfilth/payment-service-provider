import transactionFee from '../../transactionFee';

describe('Check Payment Fee', () => {
  it('should be able to check transaction fee paid when property is debit_card', () => {
    expect(transactionFee.debit_card).toBe(0.03);
  });
  it('should be able to check transaction fee paid when property is credit_card', () => {
    expect(transactionFee.credit_card).toBe(0.05);
  });
});
