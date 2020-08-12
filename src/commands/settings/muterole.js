const Guild = require('../../models/guild');

module.exports = {
	name: 'muterole',
	category: 'Settings',
	description: 'Sets the muted role for the server.',
	aliases: [],
	usage: 'muterole <role>',
	guildOnly: true,
	run: async (client, message, args) => {
		if(!message.member.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(
				'<:vError:725270799124004934> You must have the following permissions to use that: Administrator.',
			);
		}
		if (args[0] === 'off') {
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