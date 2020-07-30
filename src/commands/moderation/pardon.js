const db = require('quick.db');
const moment = require('moment');

module.exports = {
	name: 'pardon',
	category: 'Moderation',
	aliases: ['delwarn', 'unwarn'],
	usage: 'pardon <user> <amount> <reason>',
	description: 'Remove strikes from a specified person.',
	run: async (client, message, args) => {


		if(!message.member.hasPermission('BAN_MEMBERS')) {
			return message.channel.send(
				'<:vError:725270799124004934> You must have the following permissions to use that: Ban Members.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);

		if(!member) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid user.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		if(member.user.bot) {
			return message.channel.send(
				'<:vError:725270799124004934> Bot are not allowed to have strikes',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		if(message.author.id === member.id) {
			return message.channel.send(
				'<:vError:725270799124004934> You are not allowed to reset your strikes',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		const amount = args[1];
		if (isNaN(args[1])) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid number',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		const Reason = args.slice(2).join(' ');

		if(!Reason) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a reason.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		const warnings = db.get(`warnings_${message.guild.id}_${member.id}`);
		if(warnings <= 0) {
			return message.channel.send(
				`<:vWarning:725276167346585681> **${member.user.username}**#${member.user.discriminator} has no strikes`,
			).then(message.delete({ timeout: 5000 })).then(embed => {embed.delete({ timeout: 5000 });});
		}
		else {
			const logs = db.fetch(`modlog_${message.guild.id}`);
			const channel = message.guild.channels.cache.get(logs);
			if (!channel || channel === null) return;

			try {
				await member.send(`You have been pardoned ${amount}strikes in ${message.guild}\n\`[Reason]\` ${Reason}`);
			}
			catch(err) {
				await channel.send(`<:vError:725270799124004934> Failed to DM **${member.user.username}**#${member.user.discriminator} (ID: ${member.id})`);
			}
			db.subtract(`warnings_${message.guild.id}_${member.id}`, amount);
			channel.send(
				`\`[${moment(message.createdTimestamp).format('HH:mm:ss')}]\` 🏳️ **${message.author.username}**#${message.author.discriminator} pardoned \`${amount}\` strikes from **${member.user.username}**#${member.user.discriminator} (ID: ${member.id})\n\`[Reason]\` ${Reason}`,
			);
			await message.channel.send(
				`<:vSuccess:725270799098970112> Successfully pardoned \`${amount}\` strikes from **${member.user.username}**#${member.user.discriminator}`,
			).then(message.delete());
		}

	},
};