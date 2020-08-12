/* eslint-disable no-unused-vars */
const Guild = require('../../models/guild');

module.exports = {
	name: 'joinchannel',
	category: 'Settings',
	description: 'Sets the welcome channel for the server.',
	aliases: [],
	usage: 'joinchannel <channel>',
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
					'welcomer.joinchannel': null,
				},
			);
			message.channel.send(
				'<:vSuccess:725270799098970112> Welcome messages will not be sent.',
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
					'welcomer.joinchannel': args[0].id,
				},
			);
			message.channel.send(
				`<:vSuccess:725270799098970112> Welcome messages will now be sent to ${args[0]}`,
			).then(message.delete());
		}
	},
};