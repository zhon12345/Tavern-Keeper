require("dotenv").config();
const { BOT_DB } = process.env;
const mongoose = require("mongoose");
const { Client, Collection } = require("discord.js");
const client = new Client({
	disableMentions: "everyone",
	intents: ["Guilds", "GuildMessages", "MessagesContent"],
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

client.login(process.env.BOT_TOKEN);