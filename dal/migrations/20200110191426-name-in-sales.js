

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn({
    tableName: 'sales',
    schema: 'public',
  }, 'name', {
    type: Sequelize.STRING,
    allowNull: true,
  }),

  down: () => true,
};
