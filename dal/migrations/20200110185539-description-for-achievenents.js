

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn({
    tableName: 'achievements',
    schema: 'public',
  }, 'description', {
    type: Sequelize.TEXT,
    allowNull: true,
  }),

  down: () => true,
};
