

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    username: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
    first_name: {
      type: Sequelize.STRING,
    },
    last_name: {
      type: Sequelize.STRING,
    },
    items_selled: {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    total_selled: {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    disabled: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    // items_selled: DataTypes.FLOAT,
    // total_selled: DataTypes.FLOAT,
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: async queryInterface => queryInterface.dropTable('users', { cascade: true }),
};
