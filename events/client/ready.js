const Guild = require("../../models/guild");
const mongoose = require("mongoose");
const { BOT_PREFIX } = process.env;

module.exports = async (client) => {
	client.guilds.cache.map(async (guild) => {
		const HasDB = await Guild.findOne({ guildID: guild.id });
		if (HasDB) return;
		guild = new Guild({
			_id: new mongoose.Types.ObjectId(),
			guildID: guild.id,
			guildName: guild.name,
			prefix: BOT_PREFIX,
			settings: {
				antiprofanity: false,
				antilinks: false,
				muterole: null,
				memberrole: null,
				modlog: null,
				serverlog: null,
				messagelog: null,
			},
		});
		guild.save();
	});

	const stats = [
		`${client.commands.size} Commands`,
		`${client.users.cache.size} Users`,
		`${client.guilds.cache.size} Servers`,
	];

	const cmds = [`${BOT_PREFIX}help`, `${BOT_PREFIX}invite`];

	setInterval(function () {
		const stat = stats[Math.floor(Math.random() * stats.length)];
		const cmd = cmds[Math.floor(Math.random() * cmds.length)];
		client.user.setActivity(`${cmd} | ${stat}`, { type: "PLAYING" });
	}, 30000);

	console.log(`Logged in as ${client.user.tag}`);
	console.log("Prefix:", BOT_PREFIX);
};
