/* eslint-disable no-unused-vars */
const db = require('quick.db');

module.exports = {
	name: 'muterole',
	category: 'Config',
	description: 'Set the muted role for the server.',
	aliases: [],
	usage: 'muterole <role>',
	guildOnly: true,
	run: (client, message, args) => {
		if(!message.member.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(
				'You do not have the permission to use this commnad.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		const role = message.mentions.roles.first();
		if (!role) {
			return message.channel.send(
				'You did not specify a role.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}
		db.set(`muterole_${message.guild.id}`, role.id);
		message.channel.send(`Muted role has been set to ${role}`);
	},
};