const Guild = require('../../models/guild');

module.exports = {
	name: 'jointext',
	category: 'Settings',
	description: 'Sets the welcome message for the server.',
	aliases: [],
	usage: 'jointext <message>',
	run: async (client, message, args) => {
		if (!message.member.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(
				'<:vError:725270799124004934> Insufficient Permission! `ADMINISTRATOR` required.',
			);
		}

		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});

		if(!args[0]) {
			if(settings.welcomer.jointext === null) {
				return message.channel.send(
					`Join text for **${message.guild}** has been \`disabled\`.`,
				);
			}
			else {
				return message.channel.send(
					`Join text for **${message.guild}** has been set to: \n\`${settings.welcomer.jointext}\``,
				);
			}
		}
		else if (args[0].toLowerCase() === 'off') {
			await Guild.updateOne(
				{
					guildID: message.guild.id,
				},
				{
					'welcomer.jointext': null,
				},
			);
			message.channel.send(
				'<:vSuccess:725270799098970112> Welcome messages has been turned off.',
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
					'welcomer.jointext': args[0],
				},
			);
			message.channel.send(
				`<:vSuccess:725270799098970112> Welcome messages has been set to: \n${args[0]}`,
			).then(message.delete());
		}
	},
};