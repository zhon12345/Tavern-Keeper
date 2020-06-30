/* eslint-disable no-shadow */
const db = require('quick.db');
const moment = require('moment');

module.exports = {
	name: 'report',
	category: 'Moderation',
	description: 'Report a user who is breaking the rules.',
	aliases: [],
	usage: 'report <user> <reason>',
	guildOnly: true,
	run: async (client, message, args) => {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);
		if(!member) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid user.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		if(member.id === message.author.id) {
			return message.channel.send(
				'<:vError:725270799124004934> You are not allowed to report yourself.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		if(member.user.bot) {
			return message.channel.send(
				'<:vError:725270799124004934> You are not allowed to report bots.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		if(member.id === message.guild.owner.id) {
			return message.channel.send(
				'<:vWarning:725276167346585681> Are you trying to get yourself into trouble?',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		const Reason = args.slice(1).join(' ');
		if (!Reason) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a reason.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		const logs = db.fetch(`reports_${message.guild.id}`);
		const channel = message.guild.channels.cache.get(logs);
		if (!channel) return;
		channel.send(
			`\`[${moment(message.createdTimestamp).format('HH:mm:ss')}]\` ⚠️ **${member.user.username}**#${member.user.discriminator} (ID: ${member.id}) was reported by **${message.author.username}**#${message.author.discriminator} (ID: ${message.author.id})\n\`[Reason]\` ${Reason}`,
		);
		await message.channel.send(
			`<:vSuccess:725270799098970112> Successfully reported **${member.user.username}**#${member.user.discriminator}`,
		).then(message.delete());
	},
};