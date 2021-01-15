const { BOT_PREFIX, BOT_DB } = process.env;
const mongoose = require("mongoose");

module.exports = async (client) => {
	mongoose.connect(BOT_DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	const stats = [
		`${client.commands.size} Commands`,
		`${client.users.cache.size} Users`,
		`${client.guilds.cache.size} Servers`,
	];

	const cmds = [
		`${BOT_PREFIX}help`,
		`${BOT_PREFIX}invite`,
	];

	setInterval(function() {
		const stat = stats[Math.floor(Math.random() * stats.length)];
		const cmd = cmds[Math.floor(Math.random() * cmds.length)];
		client.user.setActivity(`${cmd} | ${stat}`, { type: "PLAYING" });
	}, 30000);

	console.log("Connected to MongoDB");
	console.log(`Logged in as ${client.user.tag}`);
	console.log("Prefix:", BOT_PREFIX);
};