import request from 'supertest';

import app from '../../../../../app';
import truncate from '../../../../util/truncate';

describe('Transaction with credit card', () => {
  let user;
  beforeEach(async () => {
    await truncate();
    await request(app)
      .post('/api/v1/users')
      .send({
        name: 'John Johnson',
        email: 'example@example.com',
        password: '123456',
      });
    const res = await request(app)
      .post('/api/v1/login')
      .send({
        email: 'example@example.com',
        password: '123456',
      });
    user = res.body;
  });

  it('should try to successfully create a transaction with credit card', async () => {
    const response = await request(app)
      .post('/api/v1/transactions')
      .set('authorization', user.token)
      .send({
        description: 'Smartband XYZ 3.0',
        amount: 10000,
        payment_method: 'credit_card',
        card_number: '4111111111111111',
        card_name: 'John Johnson',
        card_expiration_date: '1022',
        card_cvv: '123',
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('description', 'Smartband XYZ 3.0');
    expect(response.body).toHaveProperty('amount', 10000);
    expect(response.body).toHaveProperty('fee', 500);
    expect(response.body).toHaveProperty('payment_method', 'credit_card');
    expect(response.body).toHaveProperty('status', 'authorized');
    expect(response.body).toHaveProperty('card_last_number', '1111');
    expect(response.body).toHaveProperty('card_name', 'John Johnson');
    expect(response.body).toHaveProperty('card_expiration_date', '1022');
    expect(response.body).toHaveProperty('card_cvv', '123');
  });
});
