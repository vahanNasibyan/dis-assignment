/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const config = require("../config");

const redis = require("../dal/redis");
const db = require("../dal/models");

class UserService {
	constructor() {
		this.model = db.User;
		this.achievementModel = db.Achievement;
		this.userAchievementMapModel = db.UserAchievementMap;
		this.cryptoOptions = {
			algorithm: "sha512",
			saltLength: 8,
			iterations: 1,
			tokenLength: 12,
		};
		this.saltChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijkl$nopqrstuvwxyz0123456789";
		this.saltCharsCount = this.saltChars.length;
	}

	async _getUserById(id, types = []) {
		return this.model.findOne({
			where: {
				id,
				type: types,
			},
			attributes: { exclude: ["password"] },
			include: [{ model: db.Achievement, as: "achievements" }],
		});
	}


	async _verifyUser(username, password) {
		const user = await this.model.findOne({
			where: {
				username,
				// type: 'agent',
			},
			returning: true,
			plain: true,
			raw: true,
		});
		console.log(user);
		if (!user) {
			const err = new Error("Wrong username or password.");
			err.code = 401;
			throw err;
		}
		if (user.disabled) {
			const err = new Error("Your account is disabled.");
			err.code = 406;
			throw err;
		}
		if (!this.verifyHashPassword(password, user.password)) {
			const err = new Error("Wrong username or password.");
			err.code = 401;
			throw err;
		}

		console.log("Authorized", this.verifyHashPassword(password, user.password));
		return user;
	}

	/**
 *
 * @param password
 */
	hashPassword(password) {
		if (typeof password !== "string") throw new Error("Invalid password");

		const salt = this.generateSalt(this.cryptoOptions.saltLength);
		const algorithm = "new";

		return this.generateHash(algorithm, salt, password, this.cryptoOptions.iterations);
	}

	generateSalt(len) {
		if (typeof len !== "number" || len <= 0 || len !== parseInt(len, 10)) throw new Error("Invalid salt length");
		if (crypto.randomBytes) {
			return crypto.randomBytes(Math.ceil(len / 2)).toString("hex").substring(0, len);
		}
		let salt = "";
		for (let i = 0; i < len; i += 1) {
			salt += this.saltChars.charAt(Math.floor(Math.random() * this.saltCharsCount));
		}
		return salt;
	}

	verifyHashPassword(password, hashedPassword) {
		if (!password || !hashedPassword) return false;
		const parts = hashedPassword.split("m");
		if (parts.length !== 4) return false;
		try {
			return this.generateHash(parts[0], parts[1], password, parts[2]) === hashedPassword;
		} catch (e) {
			return false;
		}
	}

	generateHash(algorithm, salt, password, iterations) {
		console.log(algorithm, salt, password, iterations);
		try {
			let hash = password;
			for (let i = 0; i < iterations; i = +1) {
				hash = crypto.createHmac(this.cryptoOptions.algorithm, salt).update(hash).digest("hex");
			}

			return `${algorithm}m${salt}m${iterations || 1}m${hash}`;
		} catch (e) {
			throw new Error("Invalid message digest algorithm");
		}
	}

	async _createUser(username, password, type, first_name, last_name) {
		const user = await this.model.create({
			username,
			password: this.hashPassword(password),
			type,
			first_name,
			last_name,
		});
		return user;
	}

	async signup(ctx) {
		try {
			const {
				username, password, type, first_name, last_name,
			} = ctx.params;

			console.log(username, password, ctx.params);
			const userData = await this._createUser(username, password, type, first_name, last_name);

			return userData;
		} catch (e) {
			throw e;
		}
	}


	async __updateAchievementss(user, quantity, total) {
		try {
			const achievementsToAdd = await this.achievementModel.findAll({
				raw: true,
				where: {
					[db.Sequelize.Op.or]: {
						overall_sale_amount: { [db.Sequelize.Op.between]: [user.total_selled - total, user.total_selled] },
						overall_item_count: { [db.Sequelize.Op.between]: [user.items_selled - quantity, user.items_selled] },
					},
				},
			});
			console.log(achievementsToAdd);
			if (!achievementsToAdd || achievementsToAdd.length < 1) {
				return false;
			}
			const rows = await Promise.all(achievementsToAdd.map(it => this.userAchievementMapModel
				.create({ user_id: user.id, achievement_id: it.id }, { returning: true, raw: true })));
			console.log(rows);
			return rows;
		} catch (e) {
			console.log(e, typeof this);
			throw e;
		}
	}

	async _updateUserDataAfterSale(ctx) {
		try {
			const { total, quantity, user_id } = ctx.params;

			const [updated, [user]] = await this.model.update({
				items_selled: db.Sequelize.literal(`items_selled +${quantity}`),
				total_selled: db.Sequelize.literal(`total_selled +${total}`),
			},
			{
				where: { id: user_id },
				returning: true,
				raw: true,
			});
			if (updated) {
				await this.__updateAchievementss(user, quantity, total);
			}
			return user;
		} catch (e) {
			console.log(e);
			throw e;
		}
	}

	async getUserById(ctx) {

		const {
			id,
		} = ctx.params;
		const userData = await this._getUserById(id, ["agent", "admin"]);
		return userData;
	}


	async signin(ctx) {

		const { username, password } = ctx.params;
		const userData = await this._verifyUser(username, password);
		const token = jwt.sign(userData, config.AUTHORIZATION_TOKEN_SECRET);
		redis.set(`tokens:${token}`, JSON.stringify(userData), "EX", 43200);
		return {
			token,
			first_name: userData.first_name,
			id: userData.id,
			last_name: userData.last_name,
			type: userData.type,
		};

	}

	async getLeaderboard(ctx) {
		try {
			const { limit, include_sales_info } = ctx.params;
			const attributes = ["id", "first_name", "last_name"];
			if (include_sales_info === "true") {
				attributes.push("total_selled", "items_selled");
			}
			const data = await this.model.findAll({
				attributes,
				where: { type: "agent" },
				order: [["total_selled", "desc"], ["items_selled", "desc"]],
				limit,
			});
			return data;
		} catch (e) {
			throw e;
		}
	}

	async getUsers() {
		try {
			const data = await this.model.findAll({ where: { type: "agent" } });
			return data;
		} catch (e) {
			throw e;
		}
	}

	async getAchievements() {
		try {
			const data = await this.achievementModel.findAll({ type: "agent" });
			return data;
		} catch (e) {
			throw e;
		}
	}
}
const UserServiceInstance = new UserService();
module.exports = UserServiceInstance;
