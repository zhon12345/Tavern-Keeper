const Guild = require('../../models/guild');

module.exports = {
	name: 'serverlog',
	category: 'Settings',
	description: 'Sets the serverlogs channel for the server.',
	aliases: [],
	usage: 'serverlog <channel>',
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

		if (args[0] === 'off') {
			await settings.updateOne({
				serverlog: null,
			});
			message.channel.send(
				'<:vSuccess:725270799098970112> Mod logs has been turned off',
			).then(message.delete());
		}
		else {
			args[0] = message.mentions.channels.first();
			if (!args[0]) {
				return message.channel.send(
					'<:vError:725270799124004934> Please provide a valid channel.',
				);
			}
			await settings.updateOne({
				serverlog: args[0].id,
			});
			message.channel.send(
				`<:vSuccess:725270799098970112> Mod logs will now be sent to ${args[0]}`,
			).then(message.delete());
		}
	},
};