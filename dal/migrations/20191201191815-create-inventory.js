

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('inventories', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    quantity: {
      type: Sequelize.FLOAT,
    },
    price: {
      type: Sequelize.FLOAT,
    },
    notes: {
      type: Sequelize.STRING,
    },
    metadata: {
      type: Sequelize.JSONB,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
    },

    category_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
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
  down: async queryInterface => queryInterface.dropTable('inventories'),
};
