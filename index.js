require("dotenv").config();
const keepAlive = require("./server");
const Guild = require("./models/guild");
const mongoose = require("mongoose");
const { Client, Collection } = require("discord.js");
const client = new Client({ disableMentions: "everyone", ws: { intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_PRESENCES"] } });

client.commands = new Collection();
client.aliases = new Collection();
client.category = new Collection();
client.snipes = new Collection();

["command", "event"].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

client.on("message", async message => {
	if(message.content === ">update" && message.author.id === process.env.BOT_OWNER) {
		client.guilds.forEach(guild => {
			guild = new Guild({
				_id: mongoose.Types.ObjectId(),
				guildID: guild.id,
				guildName: guild.name,
				prefix: process.env.BOT_PREFIX,
				blacklisted: false,
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
			message.channel.send(`updating ${guild.name}`);
		});
	}
});

keepAlive();
client.login(process.env.BOT_TOKEN);
