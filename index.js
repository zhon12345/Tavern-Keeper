/* eslint-disable no-undef */
require('dotenv').config();
const { Client, Collection } = require('discord.js');
const db = require('quick.db');

const client = new Client({
	disableEveryone: true,
});

client.commands = new Collection();
client.aliases = new Collection();

client.login(process.env.token);
client.on('ready', () => {
	require('./events/cilent/ready') (client);
});

['command'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

client.on('message', async message => {
	let prefix;
	const prefixes = db.fetch(`prefix_${message.guild.id}`);
	if(prefixes == null) {
		prefix = 'm!';
	}
	else {
		prefix = prefixes;
	}

	if (message.author.bot) return;
	if (!message.guild) return;
	if (!message.content.startsWith(prefix)) return;

	if (!message.member) message.member = await message.guild.fetchMember(message);

	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();

	if (cmd.length === 0) return;

	let command = client.commands.get(cmd);
	if (!command) command = client.commands.get(client.aliases.get(cmd));

	if (command) {command.run(client, message, args);}
});

// Edited Messages
client.on('messageUpdate', async (oldMessage, newMessage) => {
	require('./events/guild/messageUpdate')(oldMessage, newMessage);
});

// Deleted Messages
client.on('messageDelete', async (message) => {
	require('./events/guild/messageDelete')(message);
});

// Member Added
client.on('guildMemberAdd', async (member) => {
	require('./events/guild/memberAdd')(member);
});

// Member Removed
client.on('guildMemberRemove', async (member) => {
	require('./events/guild/memberRemove')(member);
});

// Channel Created
client.on('channelCreate', async (channel) => {
	require('./events/guild/channelCreate')(channel);
});

// Channel Deleted
client.on('channelDelete', async (channel) => {
	require('./events/guild/channelDelete')(channel);
});