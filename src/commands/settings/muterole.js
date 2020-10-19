const Guild = require('../../models/guild');

module.exports = {
	name: 'muterole',
	category: 'Settings',
	description: 'Sets the muted role for the server.',
	aliases: [],
	usage: 'muterole <role>',
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
			if(settings.settings.muterole === null) {
				return message.channel.send(
					`Muted role for **${message.guild}** has been \`disabled\`.`,
				);
			}
			else {
				return message.channel.send(
					`Muted role for **${message.guild}** has been set to <@$${settings.settings.muterole}>.`,
				);
			}
		}
		else if (args[0].toLowerCase() === 'off') {
			await Guild.updateOne(
				{
					guildID: message.guild.id,
				},
				{
					'settings.muterole': null,
				},
			);
			message.channel.send(
				'<:vSuccess:725270799098970112> Muted role has been set to `None`.',
			).then(message.delete());
		}
		else {
			args[0] = message.mentions.roles.first();
			if (!args[0]) {
				return message.channel.send(
					'<:vError:725270799124004934> Please provide a valid role.',
				);
			}
			await Guild.updateOne(
				{
					guildID: message.guild.id,
				},
				{
					'settings.muterole': args[0].id,
				},
			);
			message.channel.send(
				`<:vSuccess:725270799098970112> Muted role has been set to \`@${args[0].name}\``,
			).then(message.delete());
		}
	},
};