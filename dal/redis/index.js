const redis = require("redis");
const { promisify } = require("util");

const config = require("../../config");

const redisClient = redis.createClient(config.REDIS_URL);
if (process.env.NODE_ENV !== "production") {
	redisClient.config("SET", "notify-keyspace-events", "KEAx");
}
redisClient.on("ready", () => {
	redisClient.connected = true;
});
redisClient.on("end", () => {
	redisClient.connected = false;
});
redisClient.on("error", (err) => {
	throw err;
});

redisClient.getAsync = promisify(redisClient.get).bind(redisClient);
redisClient.existsAsync = promisify(redisClient.exists).bind(redisClient);

module.exports = redisClient;
