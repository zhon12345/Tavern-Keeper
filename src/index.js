/* eslint-disable no-undef */
require('dotenv').config();
const { Client, Collection } = require('discord.js');

const client = new Client({
	disableEveryone: true,
});

client.commands = new Collection();
client.aliases = new Collection();

['command', 'event'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

client.login(process.env.BOT_TOKEN);