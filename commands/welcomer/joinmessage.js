/* eslint-disable no-unused-vars */
const db = require('quick.db');

module.exports = {
	name: 'joinmessage',
	category: 'Welcomer',
	description: 'Set the welcome message for the server.',
	aliases: [],
	usage: 'joinmessage <message>',
	guildOnly: true,
	run: (client, message, args) => {
		if(!message.member.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(
				'You do not have the permission to use this commnad.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		const joinmessage = message.content.slice(10);
		if (!joinmessage) {
			return message.channel.send(
				'You did not specify a message.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		db.set(`joinmsg_${message.guild.id}`, joinmessage);
		message.channel.send(`Welcome text has been set to ${joinmessage}`);
	},
};