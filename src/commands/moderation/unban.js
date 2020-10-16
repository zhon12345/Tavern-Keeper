const moment = require('moment');
const Guild = require('../../models/guild');

module.exports = {
	name: 'unban',
	category: 'Moderation',
	description: 'Unban a specified user from the server.',
	usage: 'unban <user> <reason>',
	run: async (client, message, args) => {
		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});
		const logs = settings.settings.modlog;
		const channel = message.guild.channels.cache.get(logs);
		if (!channel) return;

		if(!message.member.hasPermission('BAN_MEMBERS')) {
			return message.channel.send(
				'<:vError:725270799124004934> Insufficient Permission! `BAN_MEMBERS` required.',
			);
		}

		if(!message.guild.me.hasPermission('BAN_MEMBERS')) {
			return message.channel.send(
				'<:vError:725270799124004934> Insufficient Permission! `BAN_MEMBERS` required.',
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

		let Reason = args.slice(1).join(' ');
		if (!Reason) {
			Reason = 'No reason provided';
		}
		else {
			Reason = args.slice(1).join(' ');
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