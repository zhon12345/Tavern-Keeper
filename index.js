require("dotenv").config();
const { BOT_TOKEN, BOT_DB } = process.env;
const { Client, Intents, Collection } = require("discord.js");
const mongoose = require("mongoose");
const keepAlive = require("./server");

const client = new Client({
	disableMentions: "everyone",
	ws: { intents: Intents.ALL },
});

client.commands = new Collection();
client.category = new Collection();
client.aliases = new Collection();
client.snipes = new Collection();
client.cooldowns = new Set();

["command", "event"].forEach((handler) => {
	require(`./handlers/${handler}`)(client);
});

mongoose
	.connect(BOT_DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((x) => {
		console.log(`Connected to MongoDB! Database: "${x.connections[0].name}"`);
	})
	.catch((err) => {
		console.error("Error connecting to mongo", err);
	});

keepAlive();
client.login(BOT_TOKEN);
