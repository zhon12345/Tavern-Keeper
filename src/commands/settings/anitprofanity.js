const Guild = require('../../models/guild');

module.exports = {
	name: 'antiprofanity',
	category: 'Settings',
	description: 'Toggle the antiprofanity feature on/off.',
	aliases: [],
	usage: 'antiprofanity <on/off>',
	userperms: ['ADMINISTRATOR'],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});

		if(!args[0]) {
			if(settings.settings.antiprofanity === true) {
				return message.channel.send(
					`Anti Profanity for **${message.guild}** has been \`enabled\`.`,
				);
			}
			else if(settings.settings.antiprofanity === false) {
				return message.channel.send(
					`Anti Profanity for **${message.guild}** has been \`disabled\`.`,
				);
			}
		}
		else if (args[0].toLowerCase() === 'off') {
			if(settings.settings.antiprofanity === false) {
				return message.channel.send(
					'<:vError:725270799124004934> Anti Profanity is already `disabled`.',
				);
			}
			else {
				await Guild.updateOne(
					{ guildID: message.guild.id },
					{ 'settings.antiprofanity': false },
				);
				message.channel.send(
					'<:vSuccess:725270799098970112> Anti Profanity has been `disabled`',
				);
			}
		}
		else if (args[0].toLowerCase() === 'on') {
			if(settings.settings.antiprofanity === true) {
				return message.channel.send(
					'<:vError:725270799124004934> Anti Profanity is already `enabled`.',
				);
			}
			else {
				await Guild.updateOne(
					{ guildID: message.guild.id },
					{ 'settings.antiprofanity': true },
				);
				message.channel.send(
					'<:vSuccess:725270799098970112> Anti Profanity has been `enabled`',
				);
			}
		}
	},
};