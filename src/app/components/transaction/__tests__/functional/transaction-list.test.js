import request from 'supertest';

import app from '../../../../../app';
import truncate from '../../../../util/truncate';

describe('Transaction list', () => {
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

  it('should try to return a list of transactions with id', async () => {
    const response = await request(app)
      .get('/api/v1/transactions?id=1')
      .set('authorization', user.token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('contentRange');
    expect(response.body).toHaveProperty('data');
  });

  it('should try to return a list of transactions', async () => {
    await request(app)
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

    const response = await request(app)
      .get('/api/v1/transactions')
      .set('authorization', user.token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('contentRange');
    expect(response.body).toHaveProperty('data');
    const [item] = response.body.data;
    expect(item).toHaveProperty('id');
    expect(item).toHaveProperty('description');
    expect(item).toHaveProperty('amount');
    expect(item).toHaveProperty('fee');
    expect(item).toHaveProperty('payment_method');
    expect(item).toHaveProperty('status');
    expect(item).toHaveProperty('card_last_number');
    expect(item).toHaveProperty('card_name');
    expect(item).toHaveProperty('card_expiration_date');
    expect(item).toHaveProperty('card_cvv');
    expect(item).toHaveProperty('created_at');
  });
});
