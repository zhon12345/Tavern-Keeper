/* eslint-disable no-unused-vars */
const db = require('quick.db');

module.exports = {
	name: 'joinchannel',
	category: 'Welcomer',
	description: 'Set the welcome channel for the server.',
	aliases: [],
	usage: 'joinchannel <channel>',
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

		db.set(`joinchannel_${message.guild.id}`, channel.id);
		message.channel.send(`
		<:vSuccess:725270799098970112> Welcome messages will now be sent to ${channel}`,
		).then(message.delete());
	},
};