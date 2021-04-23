const Guild = require('../../models/guild');

module.exports = {
	name: 'lock',
	category: 'Moderation',
	description: 'Locks the specified channel to prevent raids.',
	aliases: ['lockdown'],
	usage: 'lock [category id]',
	userperms: ['MANAGE_CHANNELS'],
	botperms: ['USE_EXTERNAL_EMOJIS', 'MANAGE_CHANNELS'],
	run: async (client, message, args) => {
		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});

		const role = settings.settings.memberrole ? settings.settings.memberrole : message.guild.roles.everyone;
		const channel = message.guild.channels.cache.get(args[0]) || message.guild.channels.cache.get(message.channel.parent.id);

		if(channel.type === 'category') {
			channel.children.forEach(chnl => {
				chnl.updateOverwrite(role, {
					SEND_MESSAGES: false,
				});
			});
			return message.channel.send(
				`\`✔️\` Successfully locked \`${channel.name}\``,
			).then(message.delete());
		}
		else {
			return message.channel.send(
				'`❌` Please provide a valid category ID.',
			);
		}
	},
};