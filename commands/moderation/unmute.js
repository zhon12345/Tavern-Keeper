/* eslint-disable no-unused-vars */
const moment = require('moment');
const db = require('quick.db');

module.exports = {
	name: 'unmute',
	category: 'Moderation',
	description: 'Unmute a specified user.',
	aliases: ['unsilent'],
	usage: 'unmute <user> <reason>',
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
				'<:vError:725270799124004934> You are not allowed to unmute yourself.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		const Reason = args.slice(1).join(' ');
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

		const muteRole = db.fetch(`muterole_${message.guild.id}`);
		if (!muteRole) {
			return message.channel.send(
				'<:vError:725270799124004934> Mute role not found.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}
		if(member.roles.cache.has(muteRole)) {
			member.roles.remove(muteRole);
			member.roles.add(verifiedRole);
			const logs = db.fetch(`modlog_${message.guild.id}`);
			const channel = message.guild.channels.cache.get(logs);
			if (!channel) return;
			channel.send(
				`\`[${moment(message.createdTimestamp).format('HH:mm:ss')}]\` 🔊 **${message.author.username}**#${message.author.discriminator} unmuted **${member.user.username}**#${member.user.discriminator} (ID: ${member.id})\n\`[Reason]\` ${Reason}`,
			);
			await message.channel.send(
				`<:vSuccess:725270799098970112> Successfully unmuted **${member.user.username}**#${member.user.discriminator}`,
			).then(message.delete());
		}
		else {
			message.channel.send(
				'<:vError:725270799124004934> Member is not muted.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}
	},
};