import request from 'supertest';

import app from '../../../../../app';
import truncate from '../../../../util/truncate';

describe('Payable', () => {
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

  it('should try to bring the balance', async () => {
    const response = await request(app)
      .get('/api/v1/balance')
      .set('authorization', user.token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('available.amount');
    expect(response.body).toHaveProperty('waiting_funds.amount');
  });
});
