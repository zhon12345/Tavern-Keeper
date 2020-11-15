const { BOT_PREFIX, BOT_DB, TOPGG_TOKEN } = process.env;
const mongoose = require("mongoose");
const DBL = require("dblapi.js");

module.exports = async (client) => {
	mongoose.connect(BOT_DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	const botStatus = [
		`${client.commands.size} Commands`,
		`${client.users.cache.size} Users`,
		`${client.guilds.cache.size} Servers`,
	];

	const dbl = new DBL(TOPGG_TOKEN, client);
	setInterval(() => {
		dbl.postStats(client.guilds.cache.size);
	}, 1800000);

	setInterval(function() {
		const status = botStatus[Math.floor(Math.random() * botStatus.length)];
		client.user.setActivity(`${BOT_PREFIX}help | ${status}`, { type: "PLAYING" });
	}, 30000);

	console.log("Connected to MongoDB");
	console.log(`Logged in as ${client.user.tag}`);
	console.log("Prefix:", BOT_PREFIX);
};