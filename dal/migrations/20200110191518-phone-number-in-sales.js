

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn({
    tableName: 'sales',
    schema: 'public',
  }, 'phone_number', {
    type: Sequelize.STRING,
    allowNull: true,
  }),

  down: () => true,
};
