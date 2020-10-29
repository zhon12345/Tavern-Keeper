const { BOT_PREFIX, TOPGG_TOKEN } = process.env;
const DBL = require("dblapi.js");

module.exports = async (client) => {
	const dbl = new DBL(TOPGG_TOKEN, client);
	const botStatus = [
		`${client.commands.size} Commands`,
		`${client.users.cache.size} Users`,
		`${client.guilds.cache.size} Servers`,
	];

	setInterval(() => {
		dbl.postStats(client.guilds.cache.size);
	}, 1800000);

	setInterval(function() {
		const status = botStatus[Math.floor(Math.random() * botStatus.length)];
		client.user.setActivity(`${BOT_PREFIX}help | ${status}`, { type: "PLAYING" });
	}, 30000);
	console.log(`Logged in as ${client.user.tag}`);
	console.log("Prefix:", BOT_PREFIX);
};