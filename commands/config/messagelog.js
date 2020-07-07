/* eslint-disable no-unused-vars */
const db = require('quick.db');

module.exports = {
	name: 'messagelog',
	category: 'Config',
	description: 'Set the message logs channel for the server.',
	aliases: [],
	usage: 'messagelog <channel>',
	guildOnly: true,
	run: (client, message, args) => {
		if(!message.member.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(
				'<:vError:725270799124004934> You must have the following permissions to use that: Administrator.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		const channel = message.mentions.channels.first();
		if (!channel) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid channel.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}
		db.set(`messagelog_${message.guild.id}`, channel.id);
		message.channel.send(
			`<:vSuccess:725270799098970112> Message logs will now be sent to ${channel}`,
		).then(message.delete());
	},
};