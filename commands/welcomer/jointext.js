/* eslint-disable no-unused-vars */
const db = require('quick.db');

module.exports = {
	name: 'jointext',
	category: 'Welcomer',
	description: 'Set the welcome message for the server.',
	aliases: [],
	usage: 'jointext <message>',
	guildOnly: true,
	run: (client, message, args) => {
		if(!message.member.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(
				'You do not have the permission to use this commnad.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		const jointext = message.content.split(' ').slice(1).join(' ');
		if (!jointext) {
			return message.channel.send(
				'You did not specify a message.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		db.set(`jointext_${message.guild.id}`, jointext);
		message.channel.send(
			`<:vSuccess:725270799098970112> Welcome message has been set to:\n${jointext}`,
		).then(message.delete());
	},
};