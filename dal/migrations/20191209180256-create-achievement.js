

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('achievements', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    type: {
      type: Sequelize.STRING,
    },
    overall_sale_amount: {
      type: Sequelize.FLOAT,
    },
    overall_item_count: {
      type: Sequelize.FLOAT,
    },
    name: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: async queryInterface => queryInterface.dropTable('achievements', { cascade: true }),
};
