import payableTransformer from '../../payableTransform';

describe('Check payable Transformer', () => {
  it('should be able to check the response of balance without value', () => {
    const balance = [];
    const response = payableTransformer.balance(balance);
    expect(response).toHaveProperty('available.amount', 0);
    expect(response).toHaveProperty('waiting_funds.amount', 0);
  });

  it('should be able to check the response of balance with available value', () => {
    const balance = [
      {
        payment_status: 'paid',
        total: 10000,
      },
    ];
    const response = payableTransformer.balance(balance);
    expect(response).toHaveProperty('available.amount', 10000);
    expect(response).toHaveProperty('waiting_funds.amount', 0);
  });

  it('should be able to check the response of balance with waiting_funds value', () => {
    const balance = [
      {
        payment_status: 'waiting_funds',
        total: 10000,
      },
    ];
    const response = payableTransformer.balance(balance);
    expect(response).toHaveProperty('available.amount', 0);
    expect(response).toHaveProperty('waiting_funds.amount', 10000);
  });

  it('should be able to check the response of balance with available and waiting_funds value', () => {
    const balance = [
      {
        payment_status: 'paid',
        total: 10000,
      },
      {
        payment_status: 'waiting_funds',
        total: 20000,
      },
    ];
    const response = payableTransformer.balance(balance);
    expect(response).toHaveProperty('available.amount', 10000);
    expect(response).toHaveProperty('waiting_funds.amount', 20000);
  });
});
