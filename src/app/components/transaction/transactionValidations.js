import * as Yup from 'yup';
import ValidationException from '../../../helpers/error/ValidationException';

exports.validateStore = async data => {
  const schema = Yup.object().shape({
    description: Yup.string().required(),
    amount: Yup.number()
      .integer()
      .required()
      .moreThan(0),
    payment_method: Yup.string()
      .oneOf(['debit_card', 'credit_card'])
      .required(),
    card_number: Yup.string()
      .required()
      .matches(/^\d{16}$/),
    card_name: Yup.string().required(),
    card_expiration_date: Yup.string()
      .required()
      .matches(/^\d{4}$/),
    card_cvv: Yup.string()
      .required()
      .matches(/^\d{3}$/),
  });

  try {
    await schema.validate(data, { abortEarly: false });
  } catch (err) {
    throw new ValidationException(400, 'Validation failed', err.errors);
  }
};
