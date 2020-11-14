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

		const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
		if (args[0] === 'off') {
			await Guild.updateOne(
				{ guildID:message.guild.id },
				{ 'settings.modlog': null },
			);
			message.channel.send(
				'<:vSuccess:725270799098970112> Mod logs has been `disabled`',
			);
		}
		else if(channel) {
			await Guild.updateOne(
				{ guildID: message.guild.id },
				{ 'settings.modlog': channel.id },
			);
			message.channel.send(
				`<:vSuccess:725270799098970112> Mod logs has been set to ${channel}`,
			);
		}
		else if(settings.settings.modlog === null) {
			return message.channel.send(
				`Mod Logs for **${message.guild}** has been \`disabled\`.`,
			);
		}
		else {
			return message.channel.send(
				`Mod Logs for **${message.guild}** has been set to <#${settings.settings.modlog}>.`,
			);
		}
	},
};