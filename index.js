require("dotenv").config();
const keepAlive = require("./server");
const { BOT_DB } = process.env;
const mongoose = require("mongoose");
const { Client, Collection } = require("discord.js");
const client = new Client({
	disableMentions: "everyone",
	ws: { intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_INVITES", "GUILD_PRESENCES", "GUILD_MESSAGES", "DIRECT_MESSAGES"] },
});

client.commands = new Collection();
client.category = new Collection();
client.aliases = new Collection();
client.snipes = new Collection();
client.cooldowns = new Set();

["command", "event"].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

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

keepAlive();
client.login(process.env.BOT_TOKEN);