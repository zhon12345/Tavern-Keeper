const db = require('quick.db');

module.exports = {
	name: 'lock',
	category: 'Moderation',
	description: 'Locks the server and prevent raids.',
	aliases: ['lockdown'],
	usage: 'lock [channel] <on/off>',
	guildOnly: true,
	run: async (client, message, args) => {
		if(!message.member.hasPermission('BAN_MEMBERS')) {
			return message.channel.send(
				'<:vError:725270799124004934> You must have the following permissions to use that: Ban Members',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		let channel;
		const verifiedRole = db.fetch(`verifiedrole_${message.guild.id}`);
		if (args[0] === 'on') {
			channel = message.channel,
			channel.updateOverwrite(verifiedRole, {
				SEND_MESSAGES: false,
			});
			return message.channel.send(
				`<:vSuccess:725270799098970112> Successfully locked ${channel}`,
			).then(message.delete());
		}
		else if (args[0] === 'off') {
			channel = message.channel,
			channel.updateOverwrite(verifiedRole, {
				SEND_MESSAGES: true,
			});
			return message.channel.send(
				`<:vSuccess:725270799098970112> Successfully unlocked ${channel}`,
			).then(message.delete());
		}
		else if (args[1] === 'on') {
			channel = message.mentions.channels.first();
			channel.updateOverwrite(verifiedRole, {
				SEND_MESSAGES: false,
			});
			return message.channel.send(
				`<:vSuccess:725270799098970112> Successfully locked ${channel}`,
			).then(message.delete());
		}
		else if (args[1] === 'off') {
			channel = message.mentions.channels.first();
			channel.updateOverwrite(verifiedRole, {
				SEND_MESSAGES: true,
			});
			return message.channel.send(
				`<:vSuccess:725270799098970112> Successfully unlocked ${channel}`,
			).then(message.delete());
		}
	},
};