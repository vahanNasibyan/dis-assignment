

module.exports = (sequelize, DataTypes) => {
	const inventory = sequelize.define("Inventory", {
		name: DataTypes.STRING,
		quantity: DataTypes.FLOAT,
		price: DataTypes.FLOAT,
		notes: DataTypes.STRING,
		metadata: DataTypes.JSONB,
		user_id: DataTypes.INTEGER,
		category_id: DataTypes.INTEGER,
		disabled: DataTypes.BOOLEAN,
	}, {
		tableName: "inventories",
		schema: "public",
		classMethods: {
		},
		indexes: [
			{
				name: "user_id_inventory_name_unique",
				fields: ["name", "user_id"],
				unique: true,
			},
		],
	});
	inventory.associate = (models) => {
		inventory.belongsTo(models.User, { foreignKey: "user_id" });
		inventory.belongsTo(models.Category, { foreignKey: "category_id", as: "category" });
		inventory.hasMany(models.Sale, { foreignKey: "inventory_id", as: "sales" });
		// associations can be defined here
	};
	return inventory;
};
