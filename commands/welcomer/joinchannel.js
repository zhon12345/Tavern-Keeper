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
				'<:vError:725270799124004934> You must have the following permissions to use that: Administrator.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		if (args[0] === 'off') {
			db.set(`joinchannel_${message.guild.id}`, null);
			message.channel.send(
				'<:vSuccess:725270799098970112> Welcome messages will not be sent',
			).then(message.delete());
		}
		else {
			args[0] = message.mentions.channels.first();
			if (!args[0]) {
				return message.channel.send(
					'<:vError:725270799124004934> Please provide a valid channel.',
				).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
			}
			db.set(`joinchannel_${message.guild.id}`, args[0].id);
			message.channel.send(
				`<:vSuccess:725270799098970112> Welcome messages will now be sent to ${args[0]}`,
			).then(message.delete());
		}
	},
};