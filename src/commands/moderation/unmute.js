const moment = require('moment');
const Guild = require('../../models/guild');

module.exports = {
	name: 'unmute',
	category: 'Moderation',
	description: 'Unmute a muted user.',
	aliases: ['unsilent'],
	usage: 'unmute <user> <reason>',
	guildOnly: true,
	run: async (client, message, args) => {
		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});
		const logs = settings.settings.modlog;
		const channel = message.guild.channels.cache.get(logs);
		if (!channel) return;

		if(!message.member.hasPermission('KICK_MEMBERS')) {
			return message.channel.send(
				'<:vError:725270799124004934> You must have the following permissions to use that: Kick Members.',
			);
		}

		if(!message.guild.me.hasPermission('KICK_MEMBERS')) {
			return message.channel.send(
				'<:vError:725270799124004934> I must have the following permissions to use that: Kick Members.',
			);
		}

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);
		if(!member) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid user.',
			);
		}

		if(member.id === message.author.id) {
			return message.channel.send(
				'<:vError:725270799124004934> You are not allowed to unmute yourself.',
			);
		}

		const Reason = args.slice(1).join(' ');
		if (!Reason) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a reason.',
			);
		}

		const verifiedRole = settings.settings.verifyrole;
		const muteRole = settings.settings.muterole;
		if (!muteRole) {
			return message.channel.send(
				'<:vError:725270799124004934> Mute role not found.',
			);
		}
		if(member.roles.cache.has(muteRole)) {
			if(!verifiedRole) {
				try {
					await member.send(`You have been unmuted in ${message.guild}\n\`[Reason]\` ${Reason}`);
				}
				catch(err) {
					await channel.send(`<:vError:725270799124004934> Failed to DM **${member.user.username}**#${member.user.discriminator} (ID: ${member.id})`);
				}
				member.roles.remove(muteRole);
				channel.send(
					`\`[${moment(message.createdTimestamp).format('HH:mm:ss')}]\` 🔊 **${message.author.username}**#${message.author.discriminator} unmuted **${member.user.username}**#${member.user.discriminator} (ID: ${member.id})\n\`[Reason]\` ${Reason}`,
				);
				await message.channel.send(
					`<:vSuccess:725270799098970112> Successfully unmuted **${member.user.username}**#${member.user.discriminator}`,
				).then(message.delete());
			}
			else {
				try {
					await member.send(`You have been unmuted in ${message.guild}\n\`[Reason]\` ${Reason}`);
				}
				catch(err) {
					await channel.send(`<:vError:725270799124004934> Failed to DM **${member.user.username}**#${member.user.discriminator} (ID: ${member.id})`);
				}
				member.roles.remove(muteRole);
				member.roles.add(verifiedRole);
				channel.send(
					`\`[${moment(message.createdTimestamp).format('HH:mm:ss')}]\` 🔊 **${message.author.username}**#${message.author.discriminator} unmuted **${member.user.username}**#${member.user.discriminator} (ID: ${member.id})\n\`[Reason]\` ${Reason}`,
				);
				await message.channel.send(
					`<:vSuccess:725270799098970112> Successfully unmuted **${member.user.username}**#${member.user.discriminator}`,
				).then(message.delete());
			}
		}
		else {
			message.channel.send(
				'<:vError:725270799124004934> Member is not muted.',
			);
		}
	},
};