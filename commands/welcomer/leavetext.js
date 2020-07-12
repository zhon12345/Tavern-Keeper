/* eslint-disable no-unused-vars */
const db = require('quick.db');

module.exports = {
	name: 'leavetext',
	category: 'Welcomer',
	description: 'Set the leave message for the server.',
	aliases: [],
	usage: 'leavetext <message>',
	guildOnly: true,
	run: (client, message, args) => {
		if(!message.member.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(
				'<:vError:725270799124004934> You must have the following permissions to use that: Administrator.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		if (args[0] === 'off') {
			db.set(`leavetext_${message.guild.id}`, null);
			message.channel.send(
				'<:vSuccess:725270799098970112> Leave messages has been turned off.',
			).then(message.delete());
		}
		else {
			args[0] = args.slice().join(' ');
			if (!args[0]) {
				return message.channel.send(
					'<:vError:725270799124004934> Please provide a valid message.',
				).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
			}
			db.set(`leavetext_${message.guild.id}`, args[0]);
			message.channel.send(
				`<:vSuccess:725270799098970112> Leave messages has been set to: \n${args[0]}`,
			).then(message.delete());
		}
	},
};