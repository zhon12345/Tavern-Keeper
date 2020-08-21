const Guild = require('../../models/guild');

module.exports = {
	name: 'messagelog',
	category: 'Settings',
	description: 'Sets the message logs channel for the server.',
	aliases: [],
	usage: 'messagelog <channel>',
	guildOnly: true,
	run: async (client, message, args) => {
		if(!message.member.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(
				'<:vError:725270799124004934> You must have the following permissions to use that: Administrator.',
			);
		}

		if (args[0].toLowerCase() === 'off') {
			await Guild.updateOne(
				{
					guildID:message.guild.id,
				},
				{
					'settings.messagelog': null,
				},
			);
			message.channel.send(
				'<:vSuccess:725270799098970112> Mesasge logs has been turned off',
			).then(message.delete());
		}
		else {
			args[0] = message.mentions.channels.first();
			if (!args[0]) {
				return message.channel.send(
					'<:vError:725270799124004934> Please provide a valid channel.',
				);
			}
			await Guild.updateOne(
				{
					guildID: message.guild.id,
				},
				{
					'settings.messagelog': args[0].id,
				},
			);
			message.channel.send(
				`<:vSuccess:725270799098970112> Mesasge logs will now be sent to ${args[0]}`,
			).then(message.delete());
		}
	},
};