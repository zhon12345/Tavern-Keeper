const Guild = require('../../models/guild');

module.exports = {
	name: 'messagelog',
	category: 'Settings',
	description: 'Sets the message logs channel for the server.',
	usage: 'messagelog <channel>',
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
			if(settings.settings.messagelog === null) {
				return message.channel.send(
					`Message Logs for **${message.guild}** has been \`disabled\`.`,
				);
			}
			else {
				return message.channel.send(
					`Message Logs for **${message.guild}** has been set to <#${settings.settings.messagelog}>.`,
				);
			}
		}
		else if (args[0].toLowerCase() === 'off') {
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