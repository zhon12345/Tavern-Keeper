/* eslint-disable no-undef */
require('dotenv').config();
const { Client, Collection } = require('discord.js');
const db = require('quick.db');
const moment = require('moment');
const { is_url } = require('./functions');

const client = new Client({
	disableEveryone: true,
});

client.commands = new Collection();
client.aliases = new Collection();

['command', 'event'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

// Anti links
client.on('message', async message => {
	if(is_url(message.content) === true) {
		if(message.member.hasPermission('KICK_MEMBERS')) {
			return;
		}
		else {
			message.delete();
			message.channel.send(
				`${message.author}, you are not allowed to send links in this channel. Hence, you have received a warning.`,
			);

			const warnings = db.get(`warnings_${message.guild.id}_${message.author.id}`);

			if(warnings <= 0) {
				db.set(`warnings_${message.guild.id}_${message.author.id}`, 1);
				const logs = db.fetch(`modlog_${message.guild.id}`);
				const channel = message.guild.channels.cache.get(logs);
				channel.send(
					`\`[${moment(message.createdTimestamp).format('HH:mm:ss')}]\` 🚩 **${client.user.username}**#${client.user.discriminator} gave \`1\` strikes to **${message.author.username}**#${message.author.discriminator} (ID: ${message.author.id})\n\`[Reason]\` Sending Links in ${message.channel}`,
				);
			}
			else {
				db.add(`warnings_${message.guild.id}_${message.author.id}`, 1);
				const logs = db.fetch(`modlog_${message.guild.id}`);
				const channel = message.guild.channels.cache.get(logs);
				if (!channel) return;
				channel.send(
					`\`[${moment(message.createdTimestamp).format('HH:mm:ss')}]\` 🚩 **${client.user.username}**#${client.user.discriminator} gave \`1\` strikes to **${message.author.username}**#${message.author.discriminator} (ID: ${message.author.id})\n\`[Reason]\` Sending Links in ${message.channel}`,
				);
			}
		}
	}
});

client.login(process.env.token);