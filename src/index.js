/* eslint-disable no-undef */
require('dotenv').config();
const { Client, Collection } = require('discord.js');
const { Player } = require('discord-player');
const client = new Client({
	disableEveryone: true,
});

const player = new Player(client);

client.commands = new Collection();
client.aliases = new Collection();
client.player = player;

['command', 'event'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

client.login(process.env.BOT_TOKEN);