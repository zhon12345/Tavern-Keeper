const Guild = require('../../models/guild');

module.exports = {
	name: 'antilinks',
	category: 'Settings',
	description: 'Toggle the antilinks feature on/off.',
	aliases: ['antilink'],
	usage: 'antilinks <on/off>',
	disabled: false,
	userperms: ['ADMINISTRATOR'],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});

		if(!args[0]) {
			if(settings.settings.antilinks === true) {
				return message.channel.send(
					`Anti Links for **${message.guild}** has been \`enabled\`.`,
				);
			}
			else if(settings.settings.antilinks === false) {
				return message.channel.send(
					`Anti Links for **${message.guild}** has been \`disabled\`.`,
				);
			}
		}
		else if (args[0].toLowerCase() === 'off') {
			if(settings.settings.antilinks === false) {
				return message.channel.send(
					'`❌` Anti Links is already `disabled`.',
				);
			}
			else {
				await Guild.updateOne(
					{ guildID: message.guild.id },
					{ 'settings.antilinks': false },
				);
				message.channel.send(
					'`✔️` Anti Links has been `disabled`',
				);
			}
		}
		else if (args[0].toLowerCase() === 'on') {
			if(settings.settings.antilinks === true) {
				return message.channel.send(
					'`❌` Anti Links is already `enabled`.',
				);
			}
			else {
				await Guild.updateOne(
					{ guildID: message.guild.id },
					{ 'settings.antilinks': true },
				);
				message.channel.send(
					'`✔️` Anti Links has been `enabled`',
				);
			}
		}
	},
};