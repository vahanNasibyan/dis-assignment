

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn({
    tableName: 'sales',
    schema: 'public',
  }, 'sell_price', {
    type: Sequelize.FLOAT,
    allowNull: true,
  }),

  down: () => true,
};
