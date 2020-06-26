const moment = require('moment');
const db = require('quick.db');

module.exports = {
	name: 'ban',
	category: 'Moderation',
	description: 'Ban a specified user from the server.',
	aliases: [],
	usage: 'ban <user> <reason>',
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

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);
		if (!member) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid user.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		if(member.id === message.author.id) {
			return message.channel.send(
				'<:vError:725270799124004934> You are not allowed to ban yourself.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		if(member.id === message.guild.owner.id) {
			return message.channel.send(
				'<:vWarning:725276167346585681> Are you trying to get yourself into trouble?',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		const Reason = message.content.split(' ').slice(2).join(' ');
		if (!Reason) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a reason.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		if (!member.bannable) {
			return message.channel.send(
				'<:vError:725270799124004934> You are not allowed ban this user.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		member.ban();
		const logs = db.fetch(`modlog_${message.guild.id}`);
		const channel = message.guild.channels.cache.get(logs);
		if (!channel) return;
		channel.send(
			`\`[${moment(message.createdTimestamp).format('HH:mm:ss')}]\` 🔨 **${message.author.username}**#${message.author.discriminator} banned **${member.user.username}**#${member.user.discriminator} (ID: ${member.id})\n\`[Reason]\` ${Reason}`,
		);
		await message.channel.send(
			`<:vSuccess:725270799098970112> Successfully banned **${member.user.username}**#${member.user.discriminator}`,
		).then(message.delete());
	},
};