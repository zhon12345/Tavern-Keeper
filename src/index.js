require('dotenv').config();
const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ disableMentions: 'everyone', ws: { intents: Intents.ALL } });

client.commands = new Collection();
client.category = new Collection();
client.aliases = new Collection();
client.snipes = new Collection();

['command', 'event'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

client.login(process.env.BOT_TOKEN);