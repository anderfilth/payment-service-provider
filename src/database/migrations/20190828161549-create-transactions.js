module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('transactions', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id',
        },
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      amount: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      fee: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      payment_method: {
        type: Sequelize.ENUM,
        values: ['debit_card', 'credit_card'],
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM,
        values: ['processing', 'authorized', 'refused '],
        allowNull: false,
      },
      card_last_number: {
        type: Sequelize.STRING(4),
        allowNull: false,
      },
      card_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      card_expiration_date: {
        type: Sequelize.STRING(4),
        allowNull: false,
      },
      card_cvv: {
        type: Sequelize.STRING(3),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('transactions');
  },
};
