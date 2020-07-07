/* eslint-disable no-unused-vars */
const db = require('quick.db');

module.exports = {
	name: 'verifiedrole',
	category: 'Config',
	description: 'Set the verified role for the server.',
	aliases: [],
	usage: 'verifiedrole <role>',
	guildOnly: true,
	run: (client, message, args) => {
		if(!message.member.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(
				'<:vError:725270799124004934> You must have the following permissions to use that: Administrator.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		const role = message.mentions.roles.first();
		if (!role) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid role.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}
		db.set(`verifiedrole_${message.guild.id}`, role.id);
		message.channel.send(
			`<:vSuccess:725270799098970112> Verified role has been set to ${role}`,
		).then(message.delete());
	},
};