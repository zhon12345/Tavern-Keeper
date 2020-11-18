const moment = require('moment');
const ms = require('ms');
const Guild = require('../../models/guild');

module.exports = {
	name: 'tempmute',
	category: 'Moderation',
	description: 'Temporarily mute a specified user.',
	aliases: ['silent'],
	usage: 'tempmute <user> <time> [reason]',
	userperms: ['KICK_MEMBERS'],
	botperms: ['USE_EXTERNAL_EMOJIS', 'MANAGE_ROLES'],
	run: async (client, message, args) => {
		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});

		const channel = message.guild.channels.cache.get(settings.settings.modlog);
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);
		if(!member) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid user.',
			);
		}

		if(member.id === message.author.id) {
			return message.channel.send(
				'<:vError:725270799124004934> You are not allowed to mute yourself.',
			);
		}

		if(member.id === client.user.id) {
			return message.channel.send(
				'<:vError:725270799124004934> You are not allowed to mute me.',
			);
		}

		if(member.id === message.guild.owner.id) {
			return message.channel.send(
				'<:vWarning:725276167346585681> Are you trying to get yourself into trouble?',
			);
		}

		let Reason = args.slice(2).join(' ');
		if(!Reason) {
			Reason = 'No reason provided';
		}

		const time = args[1];
		if(!time || !time.match(/[0-9][dhms]/)) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid time.',
			);
		}

		const verifiedRole = settings.settings.memberrole;
		const mutedRole = settings.settings.muterole;
		if(!mutedRole) {
			return message.channel.send(
				'<:vError:725270799124004934> Mute role not found.',
			);
		}

		try {
			await member.send(`You have been tempmuted for ${time} in ${message.guild}\n\`[Reason]\` ${Reason}`);
		}
		catch(err) {
			await channel.send(`<:vError:725270799124004934> Failed to DM **${member.user.username}**#${member.user.discriminator} (ID: ${member.id})`);
		}

		if(verifiedRole && member.roles.cache.has(verifiedRole)) {
			member.roles.remove(verifiedRole);
		}

		member.roles.add(mutedRole);
		if(channel) {
			channel.send(
				`\`[${moment(message.createdTimestamp).format('HH:mm:ss')}]\` 🤐 **${message.author.username}**#${message.author.discriminator} tempmuted **${member.user.username}**#${member.user.discriminator} (ID: ${member.id}) for ${ms(ms(time))}\n\`[Reason]\` ${Reason}`,
			);
		}

		await message.channel.send(
			`<:vSuccess:725270799098970112> Successfully tempmuted **${member.user.username}**#${member.user.discriminator} for ${ms(ms(time))}`,
		).then(message.delete());

		setTimeout(function() {
			try {
				member.send(`You have been unmuted in ${message.guild}\n\`[Reason]\` Temporary mute completed`);
			}
			catch(err) {
				channel.send(`<:vError:725270799124004934> Failed to DM **${member.user.username}**#${member.user.discriminator} (ID: ${member.id})`);
			}

			if(verifiedRole) {
				member.roles.add(verifiedRole);
			}

			member.roles.remove(mutedRole);
			if(channel) {
				channel.send(
					`\`[${moment(message.createdTimestamp).format('HH:mm:ss')}]\` 🔊 **${client.user.username}**#${client.user.discriminator} unmuted **${member.user.username}**#${member.user.discriminator} (ID: ${member.id})\n\`[Reason]\` Temporary mute completed`,
				);
			}
		}, ms(time));
	},
};