import request from 'supertest';

import app from '../../../../app';
import truncate from '../../../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to register an user', async () => {
    const response = await request(app)
      .post('/api/v1/users')
      .send({
        name: 'John Johnson',
        email: 'example@example.com',
        password: '123456',
      });

    expect(response.body).toHaveProperty('id');
  });

  it('should try register user without name and return error', async () => {
    const response = await request(app)
      .post('/api/v1/users')
      .send({
        email: 'example@example.com',
        password: '123456',
      });

    expect(response.status).toBe(400);
  });

  it('should be able to register with duplicate email', async () => {
    await request(app)
      .post('/api/v1/users')
      .send({
        name: 'John Johnson',
        email: 'example@example.com',
        password: '123456',
      });

    const response = await request(app)
      .post('/api/v1/users')
      .send({
        name: 'John Johnson',
        email: 'example@example.com',
        password: '123456',
      });

    expect(response.status).toBe(400);
  });

  it('should be able to update profile', async () => {
    await request(app)
      .post('/api/v1/users')
      .send({
        name: 'John Johnson',
        email: 'example@example.com',
        password: '123456',
      });

    const session = await request(app)
      .post('/api/v1/login')
      .send({
        email: 'example@example.com',
        password: '123456',
      });

    const response = await request(app)
      .patch('/api/v1/users')
      .set('authorization', session.body.token)
      .send({
        name: 'John Johnson 1',
      });

    expect(response.status).toBe(204);
  });

  it('should try to update the password without password field', async () => {
    await request(app)
      .post('/api/v1/users')
      .send({
        name: 'John Johnson',
        email: 'example@example.com',
        password: '123456',
      });

    const session = await request(app)
      .post('/api/v1/login')
      .send({
        email: 'example@example.com',
        password: '123456',
      });

    const response = await request(app)
      .patch('/api/v1/users')
      .set('authorization', session.body.token)
      .send({
        oldPassword: '654321',
      });

    expect(response.status).toBe(400);
  });

  it('should try to update the password with the incorrect old password and give error', async () => {
    await request(app)
      .post('/api/v1/users')
      .send({
        name: 'John Johnson',
        email: 'example@example.com',
        password: '123456',
      });

    const session = await request(app)
      .post('/api/v1/login')
      .send({
        email: 'example@example.com',
        password: '123456',
      });

    const response = await request(app)
      .patch('/api/v1/users')
      .set('authorization', session.body.token)
      .send({
        oldPassword: '654321',
        password: '654321',
      });

    expect(response.status).toBe(401);
  });
});
