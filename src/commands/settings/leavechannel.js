const Guild = require('../../models/guild');

module.exports = {
	name: 'leavechannel',
	category: 'Settings',
	description: 'Sets the leave channel for the server.',
	aliases: [],
	usage: 'leavechannel <channel>',
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
					guildID: message.guild.id,
				},
				{
					'welcomer.leavechannel': null,
				},
			);
			message.channel.send(
				'<:vSuccess:725270799098970112> Leave messages will not be sent.',
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
					'welcomer.leavechannel': args[0].id,
				},
			);
			message.channel.send(
				`<:vSuccess:725270799098970112> Leave messages will now be sent to ${args[0]}`,
			).then(message.delete());
		}
	},
};