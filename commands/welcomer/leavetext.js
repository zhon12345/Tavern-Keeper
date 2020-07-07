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
		let prefix;
		const prefixes = db.fetch(`prefix_${message.guild.id}`);
		if(prefixes == null) {
			prefix = 'm!';
		}
		else {
			prefix = prefixes;
		}
		if(!message.member.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(
				'<:vError:725270799124004934> You must have the following permissions to use that: Administrator.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		const leavetext = message.content.split(' ').slice(1).join(' ');
		if (!leavetext) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid message.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		db.set(`leavetext_${message.guild.id}`, leavetext);
		message.channel.send(
			`<:vSuccess:725270799098970112> Leave message has been set to:\n${leavetext}`,
		).then(message.delete());
	},
};