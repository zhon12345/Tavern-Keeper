require("dotenv").config();
const keepAlive = require("./server");
const { Client, Collection } = require("discord.js");
const client = new Client({
	disableMentions: "everyone",
	ws: { intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_PRESENCES", "GUILD_VOICE_STATES"] },
});

const mongoose = require("mongoose");
const Guild = require("./models/guild");

client.commands = new Collection();
client.aliases = new Collection();
client.category = new Collection();
client.snipes = new Collection();

["command", "event"].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

client.on("message", message => {
	if(message.content === ">update" && message.author.id === process.env.BOT_OWNER) {
		client.guilds.cache.sort((a, b) => a.joinedAt - b.joinedAt).forEach((guild) => {
			guild = new Guild({
				_id: mongoose.Types.ObjectId(),
				guildID: guild.id,
				guildName: guild.name,
				prefix: process.env.BOT_PREFIX,
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
			message.channel.send(`Updating ${guild.name}`);
		});
	}
});

keepAlive();
client.login(process.env.BOT_TOKEN);