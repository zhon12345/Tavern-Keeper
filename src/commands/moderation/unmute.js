const moment = require('moment');
const Guild = require('../../models/guild');

module.exports = {
	name: 'unmute',
	category: 'Moderation',
	description: 'Unmute a muted user.',
	aliases: ['unsilent'],
	usage: 'unmute <user> <reason>',
	userperms: ['MANAGE_ROLES'],
	botperms: ['USE_EXTERNAL_EMOJIS', 'MANAGE_ROLES'],
	run: async (client, message, args) => {
		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});
		const logs = settings.settings.modlog;
		const channel = message.guild.channels.cache.get(logs);
		if (!channel) return;

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

		let Reason = args.slice(1).join(' ');
		if (!Reason) {
			Reason = 'No reason provided';
		}
		else {
			Reason = args.slice(1).join(' ');
		}

		const verifiedRole = settings.settings.memberrole;
		const muteRole = settings.settings.muterole;
		if (!muteRole) {
			return message.channel.send(
				'<:vError:725270799124004934> Mute role not found.',
			);
		}

		if(member.roles.cache.has(muteRole)) {
			try {
				await member.send(`You have been unmuted in ${message.guild}\n\`[Reason]\` ${Reason}`);
			}
			catch(err) {
				await channel.send(`<:vError:725270799124004934> Failed to DM **${member.user.username}**#${member.user.discriminator} (ID: ${member.id})`);
			}

			if(verifiedRole) {
				member.roles.add(verifiedRole);
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
			message.channel.send(
				'<:vError:725270799124004934> Member is not muted.',
			);
		}
	},
};