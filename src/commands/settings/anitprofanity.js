const Guild = require('../../models/guild');

module.exports = {
	name: 'antiprofanity',
	category: 'Settings',
	description: 'Toggle the antiprofanity feature on/off.',
	usage: 'antiprofanity <on/off>',
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
					'<:vError:725270799124004934> Anti Profanity is already off.',
				);
			}
			else {
				await Guild.updateOne(
					{
						guildID: message.guild.id,
					},
					{
						'settings.antiprofanity': false,
					},
				);
				message.channel.send(
					'<:vSuccess:725270799098970112> Anti Profanity has been turned off',
				).then(message.delete());
			}
		}
		else if (args[0].toLowerCase() === 'on') {
			if(settings.settings.antiprofanity === true) {
				return message.channel.send(
					'<:vError:725270799124004934> Anti Profanity is already on.',
				);
			}
			else {
				await Guild.updateOne(
					{
						guildID: message.guild.id,
					},
					{
						'settings.antiprofanity': true,
					},
				);
				message.channel.send(
					'<:vSuccess:725270799098970112> Anti Profanity has been turned on',
				).then(message.delete());
			}
		}
	},
};