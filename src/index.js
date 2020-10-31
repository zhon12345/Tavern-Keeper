require('dotenv').config();
const { Player } = require('discord-player');
const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ disableMentions: 'everyone', ws: { intents: Intents.ALL } });
const player = new Player(client);

client.commands = new Collection();
client.category = new Collection();
client.aliases = new Collection();
client.snipes = new Map();
client.player = player;

['command', 'event'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

client.login(process.env.BOT_TOKEN);