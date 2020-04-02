

module.exports = (sequelize, DataTypes) => {
	const userAchievementMap = sequelize.define("UserAchievementMap", {
		user_id: DataTypes.INTEGER,
		achievement_id: DataTypes.INTEGER,
	}, {
		tableName: "user_achievement_map",
		schema: "public",
		classMethods: {
			associate(models) {
				// associations can be defined here
			},
		},
	});
	return userAchievementMap;
};
