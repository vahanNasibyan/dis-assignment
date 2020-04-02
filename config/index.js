module.exports = {
	REDIS_URL: process.env.REDIS_URL || "redis://localhost:6379",
	AUTHORIZATION_TOKEN_SECRET: process.env.AUTHORIZATION_TOKEN_SECRET || "changeMe",
};
