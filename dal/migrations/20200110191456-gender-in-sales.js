

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn({
    tableName: 'sales',
    schema: 'public',
  }, 'gender', {
    type: Sequelize.STRING,
    allowNull: true,
  }),

  down: () => true,
};
