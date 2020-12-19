require("dotenv").config();
const { Client, Collection } = require("discord.js");
const client = new Client({
	disableMentions: "everyone",
	partials: ["MESSAGE", "CHANNEL", "REACTION"],
	ws: { intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_PRESENCES", "GUILD_VOICE_STATES"] },
});

client.commands = new Collection();
client.aliases = new Collection();
client.category = new Collection();
client.snipes = new Collection();

["command", "event"].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

client.login(process.env.BOT_TOKEN);