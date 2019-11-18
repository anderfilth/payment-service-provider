const balance = payables => {
  const paidValues = payables.find(f => f.payment_status === 'paid');
  const waitValues = payables.find(f => f.payment_status === 'waiting_funds');
  const result = {
    available: {
      amount: 0,
    },
    waiting_funds: {
      amount: 0,
    },
  };

  if (paidValues) {
    result.available.amount = parseInt(paidValues.total, 10);
  }
  if (waitValues) {
    result.waiting_funds.amount = parseInt(waitValues.total, 10);
  }
  return result;
};

module.exports = {
  balance,
};
