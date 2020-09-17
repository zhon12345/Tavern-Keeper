require('dotenv').config();
const { Client, Collection } = require('discord.js');
const client = new Client({ disableMentions: 'everyone' });
const { Player } = require('discord-player');
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