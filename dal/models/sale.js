

module.exports = (sequelize, DataTypes) => {
	const sale = sequelize.define("Sale", {
		user_id: DataTypes.INTEGER,
		inventory_id: DataTypes.INTEGER,
		price_per_item: DataTypes.FLOAT,
		total: DataTypes.FLOAT,
		quantity: DataTypes.FLOAT,
		notes: DataTypes.STRING,
		metadata: DataTypes.JSONB,
		age_range_id: DataTypes.INTEGER,
		name: DataTypes.STRING,
		gender: DataTypes.STRING,
		phone_number: DataTypes.STRING,
		disabled: DataTypes.BOOLEAN,
		sell_price: DataTypes.FLOAT,
	}, {
		tableName: "sales",
		schema: "public",
		classMethods: {
		},
	});
	sale.associate = (models) => {
		sale.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
		sale.belongsTo(models.Inventory, { foreignKey: "inventory_id", as: "inventory" });
	};
	return sale;
};
