

module.exports = (sequelize, DataTypes) => {
	const achievement = sequelize.define("Achievement", {
		type: DataTypes.STRING,
		overall_sale_amount: DataTypes.FLOAT,
		overall_item_count: DataTypes.FLOAT,
		name: DataTypes.STRING,
		description: DataTypes.TEXT
	}, {
		tableName: "achievements",
		schema: "public",
		classMethods: {
			associate(models) {
				// associations can be defined here
			},
		},
	});
	return achievement;
};


// sequelize model:create --name user_achievement_map --attributes user_id:integer,achievement_id:integer
