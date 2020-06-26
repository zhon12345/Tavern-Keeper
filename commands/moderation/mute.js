const db = require('quick.db');
const moment = require('moment');
const ms = require('ms');

module.exports = {
	name: 'mute',
	category: 'Moderation',
	description: 'Temporarily or permanantely mute a specific user.',
	aliases: ['silent'],
	usage: 'tempmute <user> <reason> [time]',
	guildOnly: true,
	run: async (client, message, args) => {
		if(!message.member.hasPermission('KICK_MEMBERS')) {
			return message.channel.send(
				'<:vError:725270799124004934> You must have the following permissions to use that: Kick Members.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		if(!message.guild.me.hasPermission('KICK_MEMBERS')) {
			return message.channel.send(
				'<:vError:725270799124004934> I must have the following permissions to use that: Kick Members.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);
		if(!member) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid user.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		if(member.id === message.author.id) {
			return message.channel.send(
				'<:vError:725270799124004934> You are not allowed to mute yourself.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		if(member.user.bot) {
			return message.channel.send(
				'<:vError:725270799124004934> You are not allowed to mute bots.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		if(member.id === message.guild.owner.id) {
			return message.channel.send(
				'<:vWarning:725276167346585681> Are you trying to get yourself into trouble?',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		const Reason = args[1];
		if (!Reason) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a reason.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		const verifiedRole = db.fetch(`verifiedrole_${message.guild.id}`);
		if(!verifiedRole) {
			return message.channel.send(
				'<:vError:725270799124004934> Verified role not found.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		const mutedRole = db.fetch(`muterole_${message.guild.id}`);
		if(!mutedRole) {
			return message.channel.send(
				'<:vError:725270799124004934> Mute role not found.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		const time = args[2];
		if(!time) {
			member.roles.remove(verifiedRole);
			member.roles.add(mutedRole);
			const logs = db.fetch(`modlog_${message.guild.id}`);
			const channel = message.guild.channels.cache.get(logs);
			if (!channel) return;
			channel.send(
				`\`[${moment(message.createdTimestamp).format('HH:mm:ss')}]\` 🔇 **${message.author.username}**#${message.author.discriminator} muted **${member.user.username}**#${member.user.discriminator} (ID: ${member.id})\n\`[Reason]\` ${Reason}`,
			);
			await message.channel.send(
				`<:vSuccess:725270799098970112> Successfully muted **${member.user.username}**#${member.user.discriminator}`,
			).then(message.delete());
		}
		else {
			member.roles.remove(verifiedRole);
			member.roles.add(mutedRole);
			const logs = db.fetch(`modlog_${message.guild.id}`);
			const channel = message.guild.channels.cache.get(logs);
			if (!channel) return;
			channel.send(
				`\`[${moment(message.createdTimestamp).format('HH:mm:ss')}]\` 🤐 **${message.author.username}**#${message.author.discriminator} tempmuted **${member.user.username}**#${member.user.discriminator} (ID: ${member.id}) for ${ms(ms(time))}\n\`[Reason]\` ${Reason}`,
			);
			await message.channel.send(
				`<:vSuccess:725270799098970112> Successfully tempmuted **${member.user.username}**#${member.user.discriminator} for ${ms(ms(time))}`,
			).then(message.delete());
		}

		setTimeout(function() {
			member.roles.add(verifiedRole);
			member.roles.remove(mutedRole);
			const logs = db.fetch(`modlog_${message.guild.id}`);
			const channel = message.guild.channels.cache.get(logs);
			if (!channel) return;
			channel.send(
				`\`[${moment(message.createdTimestamp).format('HH:mm:ss')}]\` 🔊 **${client.user.username}**#${client.user.discriminator} unmuted **${member.user.username}**#${member.user.discriminator} (ID: ${member.id})\n\`[Reason]\` Temporary mute completed`,
			);
		}, ms(time));
	},
};