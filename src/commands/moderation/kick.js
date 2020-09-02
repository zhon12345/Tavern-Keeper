const moment = require('moment');
const Guild = require('../../models/guild');

module.exports = {
	name: 'kick',
	category: 'Moderation',
	description: 'Kick a specified user from the server.',
	aliases: [],
	usage: 'kick <user> <reason>',
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
		if (!member) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid user.',
			);
		}

		if(member.id === message.author.id) {
			return message.channel.send(
				'<:vError:725270799124004934> You are not allowed to kick yourself.',
			);
		}

		if(member.id === client.user.id) {
			return message.channel.send(
				'<:vError:725270799124004934> You are not allowed to kick me.',
			);
		}

		if(member.id === message.guild.owner.id) {
			return message.channel.send(
				'<:vWarning:725276167346585681> Are you trying to get yourself into trouble?',
			);
		}

		const Reason = args.slice(1).join(' ');
		if (!Reason) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a reason.',
			);
		}

		if (!member.kickable) {
			return message.channel.send(
				'<:vError:725270799124004934> You are not allowed kick this user.',
			);
		}

		try {
			await member.send(`You have been kicked from ${message.guild}\n\`[Reason]\` ${Reason}`);
		}
		catch(err) {
			await channel.send(`<:vError:725270799124004934> Failed to DM **${member.user.username}**#${member.user.discriminator} (ID: ${member.id})`);
		}

		member.kick({ reason: Reason });
		channel.send(
			`\`[${moment(message.createdTimestamp).format('HH:mm:ss')}]\` 👢 **${message.author.username}**#${message.author.discriminator} kicked **${member.user.username}**#${member.user.discriminator} (ID: ${member.id})\n\`[Reason]\` ${Reason}`,
		);
		await message.channel.send(
			`<:vSuccess:725270799098970112> Successfully kicked **${member.user.username}**#${member.user.discriminator}`,
		).then(message.delete());
	},
};