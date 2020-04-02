

module.exports = (sequelize, DataTypes) => {
	const category = sequelize.define("Category", {
		name: DataTypes.STRING,
		metadata: DataTypes.JSONB,
		disabled: DataTypes.BOOLEAN,
	}, {
		tableName: "categories",
		schema: "public",
		classMethods: {
			associate(models) {
				category.belongsTo(models.Inventory, { foreign_key: "category_id" });
				// associations can be defined here
			},
		},
	});
	return category;
};
