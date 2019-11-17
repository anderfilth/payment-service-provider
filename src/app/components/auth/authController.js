import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import config from '../../../config/auth';

import User from '../user/userModel';

import userServiceImport from '../user/userRepository';

const userService = userServiceImport(User);

exports.store = async (req, res) => {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string().required(),
  });

  schema.validate(req.body).catch(err => {
    const { errors } = err;
    return res.status(400).json({
      error: 'Validation fails',
      details: errors,
    });
  });

  const { email, password } = req.body;
  const user = await userService.findUser(email);
  if (!user) {
    return res.status(400).json({ error: 'User not exist' });
  }
  if (!(await user.checkPassword(password))) {
    return res.status(400).json({ error: 'Password does not match' });
  }
  const { id, name } = user;
  const response = {
    user: {
      id,
      name,
      email,
    },
    token: jwt.sign({ id }, config.secret, {
      expiresIn: config.expiresIn,
    }),
  };
  return res.status(200).json(response);
};
