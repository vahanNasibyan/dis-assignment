

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('categories', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    metadata: {
      type: Sequelize.JSONB,
    },
    disabled: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
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
  down: async queryInterface => queryInterface.dropTable('categories'),
};
