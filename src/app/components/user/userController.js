import * as Yup from 'yup';
import User from './userModel';
import userServiceImport from './userService';
import ErrorHandler from '../../../helpers/error/ErrorHandler';

const userService = userServiceImport(User);

exports.store = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      throw new ErrorHandler(400, 'Validation fails');
    }

    const { name, email, password } = req.body;

    const userExist = await userService.findUser({ email });
    if (userExist) {
      throw new ErrorHandler(
        400,
        'User with the specified email already exists'
      );
    }

    const newUser = await userService.storeNewUser({ name, email, password });

    const { id } = newUser;

    return res.status(201).json({
      id,
    });
  } catch ({ message }) {
    throw new ErrorHandler(500, message);
  }
};
