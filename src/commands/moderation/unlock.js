const Guild = require('../../models/guild');

module.exports = {
	name: 'unlock',
	category: 'Moderation',
	description: 'Unlocks the specified channel after raids.',
	aliases: [],
	usage: 'unlock [channel id]',
	userperms: ['MANAGE_CHANNELS'],
	botperms: ['USE_EXTERNAL_EMOJIS', 'MANAGE_CHANNELS'],
	run: async (client, message, args) => {
		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});

		const role = settings.settings.memberrole ? settings.settings.memberrole : message.guild.roles.everyone;
		const category = message.guild.channels.cache.get(args[0]) || message.guild.channels.cache.get(message.channel.parent.id);

		if(category.type === 'category') {
			category.children.forEach(channel => {
				channel.updateOverwrite(role, {
					SEND_MESSAGES: null,
				});
			});
			return message.channel.send(
				`\`✔️\` Successfully unlocked \`${category.name}\``,
			).then(message.delete());
		}
		else {
			return message.channel.send(
				'`❌` Please provide a valid category ID.',
			);
		}
	},
};