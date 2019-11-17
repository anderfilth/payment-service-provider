import * as Yup from 'yup';
import User from './userModel';
import userRepositoryImport from './userRepository';

const userRepository = userRepositoryImport(User);

exports.store = async (req, res, next) => {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string()
      .required()
      .min(6),
  });

  schema.validate(req.body).catch(err => {
    const { errors } = err;
    return res.status(400).json({
      error: 'Validation fails',
      details: errors,
    });
  });

  const { name, email, password } = req.body;

  const userExist = await userRepository.findUser({ email });
  if (userExist) {
    return res.status(400).json({ error: 'User already exists.' });
  }

  const newUser = await userRepository.storeNewUser({ name, email, password });

  const { id } = newUser;

  return res.status(201).json({
    id,
    name,
    email,
  });
};
