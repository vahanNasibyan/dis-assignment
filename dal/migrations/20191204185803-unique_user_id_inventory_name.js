

module.exports = {
  up: async queryInterface => queryInterface.addConstraint(
    {
      tableName: 'inventories',
      schema: 'public',
    },
    ['user_id', 'name'],
    {
      type: 'unique',
      name: 'user_id_inventory_name_unique',
    },
  ),

  down: async queryInterface => queryInterface.removeConstraint('inventories', 'user_id_inventory_name_unique')
  /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  ,
};
