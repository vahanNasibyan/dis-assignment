"use strict";

const { ServiceBroker } = require("moleculer");
const { ValidationError } = require("moleculer").Errors;
const TestService = require("../../../services/user.service");

describe("Test 'user' service", () => {
	let broker = new ServiceBroker({ logger: false });
	broker.createService(TestService);

	beforeAll(() => broker.start());
	afterAll(() => broker.stop());

	describe("Test 'user.hello' action", () => {

		it("should return with 'Hello Moleculer'", async () => {
			const res = await broker.call("user.hello");
			expect(res).toBe("Hello Moleculer");
		});

	});

	describe("Test 'user.welcome' action", () => {

		it("should return with 'Welcome'", async () => {
			const res = await broker.call("user.welcome", { name: "Adam" });
			expect(res).toBe("Welcome, Adam");
		});

		it("should reject an ValidationError", async () => {
			expect.assertions(1);
			try {
				await broker.call("user.welcome");
			} catch(err) {
				expect(err).toBeInstanceOf(ValidationError);
			}
		});

	});

});

