const Guild = require("../../models/guild");
const { BOT_PREFIX, BOT_DB } = process.env;
const mongoose = require("mongoose");

module.exports = async (client) => {
	mongoose.connect(BOT_DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}).then(x => {
		console.log(
			`Connected to MongoDB! Database: "${x.connections[0].name}"`,
		);
	})
		.catch(err => {
			console.error("Error connecting to mongo", err);
		});

	client.guilds.cache.map(async (guild) => {
		const HasDB = await Guild.findOne({ guildID: guild.id });
		if(HasDB) return;
		guild = new Guild({
			_id: mongoose.Types.ObjectId(),
			guildID: guild.id,
			guildName: guild.name,
			prefix: BOT_PREFIX,
			settings:{
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

	const cmds = [
		`${BOT_PREFIX}help`,
		`${BOT_PREFIX}invite`,
	];

	setInterval(function() {
		const stat = stats[Math.floor(Math.random() * stats.length)];
		const cmd = cmds[Math.floor(Math.random() * cmds.length)];
		client.user.setActivity(`${cmd} | ${stat}`, { type: "PLAYING" });
	}, 30000);

	console.log(`Logged in as ${client.user.tag}`);
	console.log("Prefix:", BOT_PREFIX);
};