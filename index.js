require("dotenv").config();
const keepAlive = require("./server");
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

keepAlive();
client.login(process.env.BOT_TOKEN);