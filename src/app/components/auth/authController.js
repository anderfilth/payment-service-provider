import User from '../user/userModel';

import authImport from './authService';

const authService = authImport(User);

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await authService.findUser({ email });
    if (userExist) {
      res.status(409).send({ message: 'usuario ja cadastrado' });
    }

    const newUser = await authService.storeNewUser({ name, email, password });

    if (newUser.message && newUser.status) {
      return res.status(newUser.status).json(newUser.message);
    }

    return res.status(201).send({ message: 'Usuario criado com sucesso!' });
  } catch ({ message }) {
    return res.status(500).json(message);
  }
};
