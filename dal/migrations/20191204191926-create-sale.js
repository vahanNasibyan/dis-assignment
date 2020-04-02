

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('sales', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
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

    inventory_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'inventories',
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
    },
    price_per_item: {
      type: Sequelize.FLOAT,
    },
    total: {
      type: Sequelize.FLOAT,
    },
    quantity: {
      type: Sequelize.FLOAT,
    },
    notes: {
      type: Sequelize.STRING,
    },
    disabled: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    metadata: {
      type: Sequelize.JSONB,
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
  down: async queryInterface => queryInterface.dropTable('sales'),
};
