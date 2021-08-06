const Guild = require('../../models/guild');

module.exports = {
	name: 'messagelog',
	category: 'Settings',
	description: 'Sets the message logs channel for the server.',
	aliases: [],
	usage: 'messagelog <channel>',
	disabled: false,
	userperms: ['ADMINISTRATOR'],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});

		const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
		if (!args[0]) {
			return message.channel.send(
				`Message Logs for **${message.guild}** has been ${settings.settings.messagelog === null ? '`disabled`.' : `set to <#${settings.settings.messagelog}>.`}`,
			);
		}
		else if (args[0].toLowerCase() === 'off') {
			if (settings.settings.messagelog === null) {
				return message.channel.send(
					'`❌` Message Logs has already been `disabled`.',
				);
			}
			else {
				await Guild.updateOne(
					{ guildID:message.guild.id },
					{ 'settings.messagelog': null },
				);
				message.channel.send(
					'`✔️` Message logs is now `disabled`.',
				);
			}
		}
		else if(channel) {
			await Guild.updateOne(
				{ guildID: message.guild.id },
				{ 'settings.messagelog': channel.id },
			);
			message.channel.send(
				`\`✔️\` Message logs has been set to ${channel}`,
			);
		}
		else {
			return message.channel.send(
				`\`❌\` Channel not found, please provide a valid channel (eg. ${message.channel}).`,
			);
		}
	},
};