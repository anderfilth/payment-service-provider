import moment from 'moment';
import payableDate from '../../payableDate';

describe('Check Payment Date', () => {
  it('should be able to check payment date NOW() when property is debit_card', () => {
    expect(payableDate.debit_card).toBe(moment().format('YYYY-MM-DD'));
  });
  it('should be able to check payment date +30D when property is credit_card', () => {
    expect(payableDate.credit_card).toBe(
      moment()
        .add(30, 'days')
        .format('YYYY-MM-DD')
    );
  });
});
