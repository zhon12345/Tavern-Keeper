const Guild = require('../../models/guild');

module.exports = {
	name: 'modlog',
	category: 'Settings',
	description: 'Sets the modlogs channel for the server.',
	aliases: [],
	usage: 'modlog <channel>',
	userperms: ['ADMINISTRATOR'],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});

		if(!args[0]) {
			if(settings.settings.modlog === null) {
				return message.channel.send(
					`Mod Logs for **${message.guild}** has been \`disabled\`.`,
				);
			}
			else {
				return message.channel.send(
					`Mod Logs for **${message.guild}** has been set to <#${settings.settings.modlog}>.`,
				);
			}
		}
		else if (args[0].toLowerCase() === 'off') {
			await Guild.updateOne(
				{
					guildID: message.guild.id,
				},
				{
					'settings.modlog': null,
				},
			);
			message.channel.send(
				'<:vSuccess:725270799098970112> Mod logs has been turned off',
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
					'settings.modlog': args[0].id,
				},
			);
			message.channel.send(
				`<:vSuccess:725270799098970112> Mod logs will now be sent to ${args[0]}`,
			).then(message.delete());
		}
	},
};