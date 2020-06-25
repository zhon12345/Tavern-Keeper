/* eslint-disable no-unused-vars */
const db = require('quick.db');

module.exports = {
	name: 'serverlog',
	category: 'Config',
	description: 'Set the serverlogs channel for the server.',
	aliases: [],
	usage: 'serverlog <channel>',
	guildOnly: true,
	run: (client, message, args) => {
		if(!message.member.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(
				'You do not have the permission to use this commnad.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		const channel = message.mentions.channels.first();
		if (!channel) {
			return message.channel.send(
				'You did not specify a channel.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}
		db.set(`serverlog_${message.guild.id}`, channel.id);
		message.channel.send(`Server logs has been set to ${channel}`);
	},
};