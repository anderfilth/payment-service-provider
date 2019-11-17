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

  const userExists = await userRepository.findUser({ email });
  if (userExists) {
    return res.status(400).json({ error: 'User already exists.' });
  }

  const newUser = await userRepository.store({ name, email, password });

  const { id } = newUser;

  return res.status(201).json({
    id,
    name,
    email,
  });
};

exports.update = async (req, res) => {
  const schema = Yup.object().shape({
    name: Yup.string(),
    email: Yup.string().email(),
    oldPassword: Yup.string().min(6),
    password: Yup.string()
      .min(6)
      .when('oldPassword', (oldPassword, field) =>
        oldPassword ? field.required() : field
      ),
  });

  schema.validate(req.body).catch(err => {
    const { errors } = err;
    return res.status(400).json({
      error: 'Validation fails',
      details: errors,
    });
  });

  const { oldPassword } = req.body;
  const id = req.userId;
  const user = await userRepository.findUser({ id });
  // só faço isso se ele informou a senha antiga, isto é, quer alterar a senha
  if (oldPassword && !(await user.checkPassword(oldPassword))) {
    return res.status(401).json({ error: 'Password does not match.' });
  }

  await userRepository.update({ data: req.body, id });

  return res.status(204).end();
};
