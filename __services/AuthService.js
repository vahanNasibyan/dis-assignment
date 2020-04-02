/* eslint-disable no-underscore-dangle */
const jwt = require("jsonwebtoken");
const redis = require("../dal/redis");
const UserService = require("./UserService");
const config = require("../config");

class AuthService {
	async authUser(token) {
		try {
			// Check the token

			const exists = await redis.existsAsync(`tokens:${token}`);
			if (!exists) {
				throw new Error("Invalid token");
			}
			const decoded = jwt.verify(
				token,
				config.AUTHORIZATION_TOKEN_SECRET,
			);
			if (!decoded) {
				throw new Error("Invalid token");
			}
			redis.set(`tokens:${token}`, JSON.stringify(decoded), "EX", 3600);
			// add expiration notifier record on redis
			// end
			const user = await UserService._getUserById(decoded.id);
			if (!user) {
				throw new Error("Invalid token");
			}
		} catch (err) {
			console.log(err);
			throw err;
		}
	}
}


const AuthServiceInstance = new AuthService();
module.exports = AuthServiceInstance;
