require("dotenv").config();
const { Client, Collection } = require("discord.js");
const client = new Client({
	disableMentions: "everyone",
	ws: { intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_PRESENCES", "GUILD_VOICE_STATES"] },
});

client.login(process.env.BOT_TOKEN);

client.commands = new Collection();
client.aliases = new Collection();
client.category = new Collection();
client.snipes = new Collection();

["command", "event"].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});