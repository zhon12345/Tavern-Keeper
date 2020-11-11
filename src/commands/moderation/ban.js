const moment = require('moment');
const Guild = require('../../models/guild');

module.exports = {
	name: 'ban',
	category: 'Moderation',
	description: 'Ban a specified user from the server.',
	aliases: ['banish'],
	usage: 'ban <user> <reason>',
	userperms: ['BAN_MEMBERS'],
	botperms: ['USE_EXTERNAL_EMOJIS', 'BAN_MEMBERS'],
	run: async (client, message, args) => {
		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});
		const logs = settings.settings.modlog;
		const channel = message.guild.channels.cache.get(logs);
		if (!channel) return;

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);
		if (!member) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid user.',
			);
		}

		if(member.id === message.author.id) {
			return message.channel.send(
				'<:vError:725270799124004934> You are not allowed to ban yourself.',
			);
		}

		if(member.id === client.user.id) {
			return message.channel.send(
				'<:vError:725270799124004934> You are not allowed to ban me.',
			);
		}

		if(member.id === message.guild.owner.id) {
			return message.channel.send(
				'<:vWarning:725276167346585681> Are you trying to get yourself into trouble?',
			);
		}

		let Reason = args.slice(1).join(' ');
		if (!Reason) {
			Reason = 'No reason provided';
		}
		else {
			Reason = args.slice(1).join(' ');
		}

		if (!member.bannable) {
			return message.channel.send(
				'<:vError:725270799124004934> You are not allowed ban this user.',
			);
		}

		try {
			await member.send(`You have been banned from ${message.guild}\n\`[Reason]\` ${Reason}`);
		}
		catch(err) {
			await channel.send(`<:vError:725270799124004934> Failed to DM **${member.user.username}**#${member.user.discriminator} (ID: ${member.id})`);
		}

		member.ban({ reason: Reason });
		channel.send(
			`\`[${moment(message.createdTimestamp).format('HH:mm:ss')}]\` 🔨 **${message.author.username}**#${message.author.discriminator} banned **${member.user.username}**#${member.user.discriminator} (ID: ${member.id})\n\`[Reason]\` ${Reason}`,
		);
		await message.channel.send(
			`<:vSuccess:725270799098970112> Successfully banned **${member.user.username}**#${member.user.discriminator}`,
		).then(message.delete());
	},
};