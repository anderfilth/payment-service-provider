import moment from 'moment';

module.exports = {
  debit_card: moment().format('YYYY-MM-DD'),
  credit_card: moment()
    .add(30, 'days')
    .format('YYYY-MM-DD'),
};
