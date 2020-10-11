const Guild = require('../../models/guild');

module.exports = {
	name: 'antilinks',
	category: 'Settings',
	description: 'Toggle the antilinks feature on/off.',
	aliases: ['antilink'],
	usage: 'antilinks <on/off>',
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
					'<:vError:725270799124004934> Anti Links is already off.',
				);
			}
			else {
				await Guild.updateOne(
					{
						guildID: message.guild.id,
					},
					{
						'settings.antilinks': false,
					},
				);
				message.channel.send(
					'<:vSuccess:725270799098970112> Anti Links has been turned off',
				).then(message.delete());
			}
		}
		else if (args[0].toLowerCase() === 'on') {
			if(settings.settings.antilinks === true) {
				return message.channel.send(
					'<:vError:725270799124004934> Anti Links is already on.',
				);
			}
			else {
				await Guild.updateOne(
					{
						guildID: message.guild.id,
					},
					{
						'settings.antilinks': true,
					},
				);
				message.channel.send(
					'<:vSuccess:725270799098970112> Anti Links has been turned on',
				).then(message.delete());
			}
		}
	},
};