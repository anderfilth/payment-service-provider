import bcrypt from 'bcryptjs';

import truncate from '../../../util/truncate';
import User from '../userModel';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should encrypt user password when user created', async () => {
    const user = await User.create({
      name: 'John Johnson',
      email: 'example@example.com',
      password: '123456',
    });

    const compareHash = await bcrypt.compare('123456', user.password_hash);
    expect(compareHash).toBe(true);
  });
});
