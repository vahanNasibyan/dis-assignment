

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    disabled: DataTypes.BOOLEAN,
    items_selled: DataTypes.FLOAT,
    total_selled: DataTypes.FLOAT,
    type: DataTypes.STRING,
  }, {
    // hooks: {
    //   beforeCreate: (user) => {
    //     if (user.password && user.password.length) {
    //       console.log('Hasing password');
    //       user.password = hashPassword(user.password);
    //     }
    //     return user;
    //   },


    //   beforeUpdate: (user) => {
    //     if (user.password && user.password.length) {
    //       console.log('Hasing password');
    //       user.password = hashPassword(user.password);
    //     }

    //     return user;
    //   },
    // },
    tableName: 'users',
    schema: 'public',
    classMethods: {
      associate(models) {
        // associations can be defined here
        user.hasMany(models.Inventory);
        user.hasMany(models.Sale);
      },
    },
  });

  user.associate = (models) => {
    user.belongsToMany(models.Achievement, {
      through: 'user_achievement_map', foreignKey: 'user_id', otherKey: 'achievement_id', as: 'achievements',
    });
    user.hasMany(models.Inventory, { foreignKey: 'user_id', as: 'inventories' });
    user.hasMany(models.Sale, { foreignKey: 'user_id', as: 'sales' });
    // associations can be defined here
  };
  return user;
};
