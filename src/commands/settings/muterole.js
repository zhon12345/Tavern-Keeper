const Guild = require('../../models/guild');

module.exports = {
	name: 'muterole',
	category: 'Settings',
	description: 'Sets the muted role for the server.',
	aliases: [],
	usage: 'muterole <role>',
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
				{ 'settings.muterole': null },
			);
			message.channel.send(
				'`✔️` Muted role has been set to `None`.',
			);
		}
		else if(role) {
			await Guild.updateOne(
				{ guildID: message.guild.id },
				{ 'settings.muterole': role.id },
			);
			message.channel.send(
				`\`✔️\` Muted role has been set to \`${role.name}\``,
			);
		}
		else if(settings.settings.muterole === null) {
			return message.channel.send(
				`Muted role for **${message.guild}** has been set to \`None\`.`,
			);
		}
		else {
			return message.channel.send(
				`Muted role for **${message.guild}** has been set to \`${message.guild.roles.cache.get(settings.settings.muterole).name}\`.`,
			);
		}
	},
};