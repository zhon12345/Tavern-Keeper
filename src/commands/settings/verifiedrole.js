/* eslint-disable no-unused-vars */
const db = require('quick.db');

module.exports = {
	name: 'verifiedrole',
	category: 'Settings',
	description: 'Sets the verified role for the server.',
	aliases: [],
	usage: 'verifiedrole <role>',
	guildOnly: true,
	run: (client, message, args) => {
		if(!message.member.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(
				'<:vError:725270799124004934> You must have the following permissions to use that: Administrator.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		if (args[0] === 'off') {
			db.set(`verifiedrole_${message.guild.id}`, null);
			message.channel.send(
				'<:vSuccess:725270799098970112> Verified role has been turned off',
			).then(message.delete());
		}
		else {
			args[0] = message.mentions.roles.first();
			if (!args[0]) {
				return message.channel.send(
					'<:vError:725270799124004934> Please provide a valid role.',
				).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
			}
			db.set(`verifiedrole_${message.guild.id}`, args[0].id);
			message.channel.send(
				`<:vSuccess:725270799098970112> Verified role has been set to ${args[0]}`,
			).then(message.delete());
		}
	},
};