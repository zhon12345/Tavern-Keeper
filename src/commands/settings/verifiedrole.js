const Guild = require('../../models/guild');

module.exports = {
	name: 'verifiedrole',
	category: 'Settings',
	description: 'Sets the verified role for the server.',
	aliases: [],
	usage: 'verifiedrole <role>',
	userperms: ['ADMINISTRATOR'],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});

		if(!args[0]) {
			if(settings.settings.verifyrole === null) {
				return message.channel.send(
					`Verified role for **${message.guild}** has been \`disabled\`.`,
				);
			}
			else {
				return message.channel.send(
					`Verified role for **${message.guild}** has been set to <@$${settings.settings.verifyrole}>.`,
				);
			}
		}
		else if (args[0].toLowerCase() === 'off') {
			await Guild.updateOne(
				{
					guildID: message.guild.id,
				},
				{
					'settings.verifyrole': null,
				},
			);
			message.channel.send(
				'<:vSuccess:725270799098970112> Verified role has been set to `None`.',
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
					'settings.verifyrole': args[0].id,
				},
			);
			message.channel.send(
				`<:vSuccess:725270799098970112> Verified role has been set to \`@${args[0].name}\``,
			).then(message.delete());
		}
	},
};