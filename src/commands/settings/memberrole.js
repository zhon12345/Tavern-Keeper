const Guild = require('../../models/guild');

module.exports = {
	name: 'memberrole',
	category: 'Settings',
	description: 'Sets the member role for the server.',
	aliases: [],
	usage: 'memberrole <role>',
	userperms: ['ADMINISTRATOR'],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});

		const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
		if (args[0] === 'off') {
			await Guild.updateOne(
				{ guildID:message.guild.id },
				{ 'settings.memberrole': null },
			);
			message.channel.send(
				'`✔️` Member role has been set to `None`.',
			);
		}
		else if(role) {
			await Guild.updateOne(
				{ guildID: message.guild.id },
				{ 'settings.memberrole': role.id },
			);
			message.channel.send(
				`\`✔️\` Member role has been set to \`${role.name}\``,
			);
		}
		else if(settings.settings.memberrole === null) {
			return message.channel.send(
				`Member role for **${message.guild}** has been set to \`None\`.`,
			);
		}
		else {
			return message.channel.send(
				`Member role for **${message.guild}** has been set to \`${message.guild.roles.cache.get(settings.settings.memberrole).name}\`.`,
			);
		}
	},
};