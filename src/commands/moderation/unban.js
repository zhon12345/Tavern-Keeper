const moment = require('moment');
const Guild = require('../../models/guild');

module.exports = {
	name: 'unban',
	category: 'Moderation',
	description: 'Unban a specified user from the server.',
	aliases: [],
	usage: 'unban <user> <reason>',
	guildOnly: true,
	run: async (client, message, args) => {
		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});
		const logs = settings.settings.modlog;
		const channel = message.guild.channels.cache.get(logs);
		if (!channel || channel === null) return;

		if(!message.member.hasPermission('BAN_MEMBERS')) {
			return message.channel.send(
				'<:vError:725270799124004934> You must have the following permissions to use that: Ban Members.',
			);
		}

		if(!message.guild.me.hasPermission('BAN_MEMBERS')) {
			return message.channel.send(
				'<:vError:725270799124004934> I must have the following permissions to use that: Ban Members.',
			);
		}

		const id = args[0];
		const bannedUsers = await message.guild.fetchBans();
		const user = bannedUsers.get(id);
		if (!user) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid user.',
			);
		}

		const Reason = args.slice(1).join(' ');
		if (!Reason) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a reason.',
			);
		}

		message.guild.members.unban(user.user);
		channel.send(
			`\`[${moment(message.createdTimestamp).format('HH:mm:ss')}]\` 🔧 **${message.author.username}**#${message.author.discriminator} unbanned **${user.user.username}**#${user.user.discriminator} (ID: ${user.user.id})\n\`[Reason]\` ${Reason}`,
		);
		await message.channel.send(
			`<:vSuccess:725270799098970112> Successfully unbanned **${user.user.username}**#${user.user.discriminator}`,
		).then(message.delete());
	},
};