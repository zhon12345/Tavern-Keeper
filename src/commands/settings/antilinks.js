const db = require('quick.db');

module.exports = {
	name: 'antilinks',
	category: 'Settings',
	description: 'Toggle the antilinks feature on/off.',
	aliases: [],
	usage: 'antilinks <on/off>',
	guildOnly: true,
	run: (client, message, args) => {
		if(!message.member.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(
				'<:vError:725270799124004934> You must have the following permissions to use that: Administrator.',
			);
		}

		if (args[0] === 'off') {
			db.set(`antilinks_${message.guild.id}`, false);
			message.channel.send(
				'<:vSuccess:725270799098970112> Anti Links has been turned off',
			).then(message.delete());
		}
		else if (args[0] === 'on') {
			db.set(`antilinks_${message.guild.id}`, true);
			message.channel.send(
				'<:vSuccess:725270799098970112> Anti Links has been turned on',
			).then(message.delete());
		}
	},
};