import * as Yup from 'yup';
import ValidationException from '../../../helpers/error/ValidationException';

exports.validateStore = async data => {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string()
      .required()
      .min(6),
  });

  try {
    await schema.validate(data, { abortEarly: false });
  } catch (err) {
    throw new ValidationException(400, 'Validation failed', err.errors);
  }
};

exports.validateUpdate = async data => {
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

  try {
    await schema.validate(data, { abortEarly: false });
  } catch (err) {
    throw new ValidationException(400, 'Validation failed', err.errors);
  }
};
