/* eslint-disable no-unused-vars */
const db = require('quick.db');

module.exports = {
	name: 'serverlog',
	category: 'Settings',
	description: 'Sets the serverlogs channel for the server.',
	aliases: [],
	usage: 'serverlog <channel>',
	guildOnly: true,
	run: (client, message, args) => {
		if(!message.member.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(
				'<:vError:725270799124004934> You must have the following permissions to use that: Administrator.',
			);
		}

		if (args[0] === 'off') {
			db.set(`serverlog_${message.guild.id}`, null);
			message.channel.send(
				'<:vSuccess:725270799098970112> Server logs has been turned off',
			).then(message.delete());
		}
		else {
			args[0] = message.mentions.channels.first();
			if (!args[0]) {
				return message.channel.send(
					'<:vError:725270799124004934> Please provide a valid channel.',
				);
			}
			db.set(`serverlog_${message.guild.id}`, args[0].id);
			message.channel.send(
				`<:vSuccess:725270799098970112> Server logs will now be sent to ${args[0]}`,
			).then(message.delete());
		}
	},
};