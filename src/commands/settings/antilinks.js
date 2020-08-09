const Guild = require('../../models/guild');

module.exports = {
	name: 'antilinks',
	category: 'Settings',
	description: 'Toggle the antilinks feature on/off.',
	aliases: [],
	usage: 'antilinks <on/off>',
	guildOnly: true,
	run: async (client, message, args) => {
		if(!message.member.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(
				'<:vError:725270799124004934> You must have the following permissions to use that: Administrator.',
			);
		}

		if (args[0] === 'off') {
			await Guild.updateOne(
				{
					guildID: message.guild.id,
				},
				{
					'settings.antilinks': false,
				},
			);
			message.channel.send(
				'<:vSuccess:725270799098970112> Anti Links has been turned off',
			).then(message.delete());
		}
		else if (args[0] === 'on') {
			await Guild.updateOne(
				{
					guildID: message.guild.id,
				},
				{
					'settings.antilinks': true,
				},
			);
			message.channel.send(
				'<:vSuccess:725270799098970112> Anti Links has been turned on',
			).then(message.delete());
		}
	},
};