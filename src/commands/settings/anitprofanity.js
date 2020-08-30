const Guild = require('../../models/guild');

module.exports = {
	name: 'antiprofanity',
	category: 'Settings',
	description: 'Toggle the antiprofanity feature on/off.',
	aliases: [],
	usage: 'antiprofanity <on/off>',
	guildOnly: true,
	run: async (client, message, args) => {
		if(!message.member.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(
				'<:vError:725270799124004934> You must have the following permissions to use that: Administrator.',
			);
		}

		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});

		if (args[0].toLowerCase() === 'off') {
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