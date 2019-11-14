import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import config from '../../../config/auth';

import User from '../user/userModel';

import userServiceImport from '../user/userService';
import ErrorHandler from '../../../helpers/error/ErrorHandler';

const userService = userServiceImport(User);

exports.store = async (req, res) => {
  try {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      throw new ErrorHandler(400, 'Validation fails');
    }

    const { email, password } = req.body;
    const user = await userService.findUser(email);
    if (!user) {
      throw new ErrorHandler(400, 'User not exist');
    }
    if (!(await user.checkPassword(password))) {
      throw new ErrorHandler(400, 'Password does not match');
    }
    const { id, name } = user;
    const response = {
      id,
      name,
      email,
      token: jwt.sign({ id }, config.secret, {
        expiresIn: config.expiresIn,
      }),
    };
    res.status(200).json(response);
  } catch ({ message }) {
    res.status(500).json(message);
  }
};
