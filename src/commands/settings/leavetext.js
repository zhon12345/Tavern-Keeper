const Guild = require('../../models/guild');

module.exports = {
	name: 'leavetext',
	category: 'Settings',
	description: 'Sets the leave message for the server.',
	aliases: [],
	usage: 'leavetext <message>',
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
					'welcomer.leavetext': null,
				},
			);
			message.channel.send(
				'<:vSuccess:725270799098970112> Leave messages has been turned off.',
			).then(message.delete());
		}
		else {
			args[0] = args.slice().join(' ');
			if (!args[0]) {
				return message.channel.send(
					'<:vError:725270799124004934> Please provide a valid message.',
				);
			}
			await Guild.updateOne(
				{
					guildID: message.guild.id,
				},
				{
					'welcomer.leavetext': args[0],
				},
			);
			message.channel.send(
				`<:vSuccess:725270799098970112> Leave messages has been set to: \n${args[0]}`,
			).then(message.delete());
		}
	},
};