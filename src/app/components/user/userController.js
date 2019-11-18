import User from './userModel';
import * as userValidations from './userValidations';
import userRepositoryImport from './userRepository';

const userRepository = userRepositoryImport(User);

exports.store = async (req, res) => {
  try {
    await userValidations.validateStore(req.body);
  } catch (err) {
    return res.status(err.statusCode).json(err.validationErrors);
  }

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
  try {
    await userValidations.validateUpdate(req.body);
  } catch (err) {
    return res.status(err.statusCode).json(err.validationErrors);
  }

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
