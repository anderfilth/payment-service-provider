const transactionOne = transaction => {
  return {
    id: transaction.id,
    description: transaction.description,
    amount: parseInt(transaction.amount, 10),
    fee: parseInt(transaction.fee, 10),
    payment_method: transaction.payment_method,
    status: transaction.status,
    card_last_number: transaction.card_last_number,
    card_name: transaction.card_name,
    card_expiration_date: transaction.card_expiration_date,
    card_cvv: transaction.card_cvv,
    created_at: transaction.createdAt,
  };
};

const transactions = transactionList => ({
  contentRange: transactionList.count,
  data: transactionList.rows.map(transactionOne),
});

module.exports = {
  transactionOne,
  transactions,
};
