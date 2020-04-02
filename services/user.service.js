const UserService = require("../__services/UserService");

const version = process.env.VERSION || "v1";

module.exports = {
	name: "user",
	version,
	actions: {
		signin: {
			rest:{
				method: "POST",
				path:"signin"
			},
			handler: ctx => UserService.signin(ctx),
		},
		signup: {
			rest: {
				method: "POST",
				path:"signup"
			},
			handler: ctx => UserService.signup(ctx),
		},
	},
};
