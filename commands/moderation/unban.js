const moment = require('moment');
const db = require('quick.db');

module.exports = {
	name: 'unban',
	category: 'Moderation',
	description: 'Unban a specified user from the server.',
	aliases: [],
	usage: 'unban <user> <reason>',
	guildOnly: true,
	run: async (client, message, args) => {
		if(!message.member.hasPermission('BAN_MEMBERS')) {
			return message.channel.send(
				'<:vError:725270799124004934> You must have the following permissions to use that: Ban Members.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		if(!message.guild.me.hasPermission('BAN_MEMBERS')) {
			return message.channel.send(
				'<:vError:725270799124004934> I must have the following permissions to use that: Ban Members.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		const id = args[0];
		const bannedUsers = await message.guild.fetchBans();
		const user = bannedUsers.get(id);
		if (!user) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid user.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		const Reason = message.content.split(' ').slice(2).join(' ');
		if (!Reason) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a reason.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		message.guild.members.unban(user.user);
		const logs = db.fetch(`modlog_${message.guild.id}`);
		const channel = message.guild.channels.cache.get(logs);
		if (!channel) return;
		channel.send(
			`\`[${moment(message.createdTimestamp).format('HH:mm:ss')}]\` 🔧 **${message.author.username}**#${message.author.discriminator} unbanned **${user.user.username}**#${user.user.discriminator} (ID: ${user.user.id})\n\`[Reason]\` ${Reason}`,
		);
		await message.channel.send(
			`<:vSuccess:725270799098970112> Successfully unbanned **${user.user.username}**#${user.user.discriminator}`,
		).then(message.delete());
	},
};