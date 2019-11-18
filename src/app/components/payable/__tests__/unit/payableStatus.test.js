import payableStatus from '../../payableStatus';

describe('Check Payment Status', () => {
  it('should be able to check payment status paid when property is debit_card', () => {
    expect(payableStatus.debit_card).toBe('paid');
  });
  it('should be able to check payment status paid when property is credit_card', () => {
    expect(payableStatus.credit_card).toBe('waiting_funds');
  });
});
