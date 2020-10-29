require("dotenv").config();
const keepAlive = require("./server");
const { Client, Collection, Intents } = require("discord.js");
const client = new Client({ disableMentions: "everyone", ws: { intents: Intents.ALL } });

client.commands = new Collection();
client.aliases = new Collection();
client.category = new Collection();
client.snipes = new Map();

["command", "event"].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

keepAlive();
client.login(process.env.BOT_TOKEN);
