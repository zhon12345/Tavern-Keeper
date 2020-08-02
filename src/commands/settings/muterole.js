/* eslint-disable no-unused-vars */
const db = require('quick.db');

module.exports = {
	name: 'muterole',
	category: 'Settings',
	description: 'Sets the muted role for the server.',
	aliases: [],
	usage: 'muterole <role>',
	guildOnly: true,
	run: (client, message, args) => {
		if(!message.member.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(
				'<:vError:725270799124004934> You must have the following permissions to use that: Administrator.',
			);
		}

		if (args[0] === 'off') {
			db.set(`muterole_${message.guild.id}`, null);
			message.channel.send(
				'<:vSuccess:725270799098970112> Muted role has been turned off',
			).then(message.delete());
		}
		else {
			args[0] = message.mentions.roles.first();
			if (!args[0]) {
				return message.channel.send(
					'<:vError:725270799124004934> Please provide a valid role.',
				);
			}
			db.set(`muterole_${message.guild.id}`, args[0].id);
			message.channel.send(
				`<:vSuccess:725270799098970112> Muted role has been set to ${args[0]}`,
			).then(message.delete());
		}
	},
};