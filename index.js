require('dotenv').config();
const { abl } = require('abl-wrapper');
const { ASTROBOTLIST_TOKEN } = process.env;
const { Client, Collection } = require('discord.js');
const client = new Client({ disableMentions: 'everyone' });
const keepAlive = require('./server');

client.commands = new Collection();
client.aliases = new Collection();
client.category = new Collection();
client.snipes = new Map();

['command', 'event'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

setInterval(() => {
	abl.count(ASTROBOTLIST_TOKEN, client, (error, success) => {
		if(error) throw new Error(error);
		else console.log(success);
	});
}, 86400000);


keepAlive();
client.login(process.env.BOT_TOKEN);
