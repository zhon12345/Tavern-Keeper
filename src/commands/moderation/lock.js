const Guild = require('../../models/guild');

module.exports = {
	name: 'lock',
	category: 'Moderation',
	description: 'Locks the specified channel to prevent raids.',
	aliases: ['lockdown'],
	usage: 'lock [channel] <on/off>',
	userperms: ['MANAGE_CHANNELS'],
	botperms: ['USE_EXTERNAL_EMOJIS', 'MANAGE_CHANNELS'],
	run: async (client, message, args) => {
		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});

		let channel;
		const role = settings.settings.verifyrole || message.guild.roles.everyone;
		if (args[0].toLowerCase() === 'on') {
			channel = message.channel,
			channel.updateOverwrite(role, {
				SEND_MESSAGES: false,
			});
			return message.channel.send(
				`<:vSuccess:725270799098970112> Successfully locked ${channel}`,
			).then(message.delete());
		}
		else if (args[0].toLowerCase() === 'off') {
			channel = message.channel,
			channel.updateOverwrite(role, {
				SEND_MESSAGES: true,
			});
			return message.channel.send(
				`<:vSuccess:725270799098970112> Successfully unlocked ${channel}`,
			).then(message.delete());
		}
		else if (args[1] === 'on') {
			channel = message.mentions.channels.first();
			channel.updateOverwrite(role, {
				SEND_MESSAGES: false,
			});
			return message.channel.send(
				`<:vSuccess:725270799098970112> Successfully locked ${channel}`,
			).then(message.delete());
		}
		else if (args[1] === 'off') {
			channel = message.mentions.channels.first();
			channel.updateOverwrite(role, {
				SEND_MESSAGES: true,
			});
			return message.channel.send(
				`<:vSuccess:725270799098970112> Successfully unlocked ${channel}`,
			).then(message.delete());
		}
	},
};