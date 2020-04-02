

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn({
    tableName: 'sales',
    schema: 'public',
  }, 'age_range_id', {
    type: Sequelize.INTEGER,
    allowNull: true,
  }),

  down: () => true,
};
