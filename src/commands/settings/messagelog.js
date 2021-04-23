const Guild = require('../../models/guild');

module.exports = {
	name: 'messagelog',
	category: 'Settings',
	description: 'Sets the message logs channel for the server.',
	aliases: [],
	usage: 'messagelog <channel>',
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
				{ 'settings.messagelog': null },
			);
			message.channel.send(
				'`✔️` Mesasge logs has been `disabled`',
			);
		}
		else if(channel) {
			await Guild.updateOne(
				{ guildID: message.guild.id },
				{ 'settings.messagelog': channel.id },
			);
			message.channel.send(
				`\`✔️\` Mesasge logs has been set to ${channel}`,
			);
		}
		else if(settings.settings.messagelog === null) {
			return message.channel.send(
				`Message Logs for **${message.guild}** has been \`disabled\`.`,
			);
		}
		else {
			return message.channel.send(
				`Message Logs for **${message.guild}** has been set to <#${settings.settings.messagelog}>.`,
			);
		}
	},
};