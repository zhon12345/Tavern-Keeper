const moment = require('moment');
const Guild = require('../../models/guild');

module.exports = {
	name: 'mute',
	category: 'Moderation',
	description: 'Permanently mute a specified user.',
	aliases: [],
	usage: 'mute <user> [reason]',
	disabled: false,
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
				'`❌` Please provide a valid user.',
			);
		}

		if(member.id === message.author.id) {
			return message.channel.send(
				'`❌` You are not allowed to mute yourself.',
			);
		}

		if(member.id === client.user.id) {
			return message.channel.send(
				'`❌` You are not allowed to mute me.',
			);
		}

		if(member.id === message.guild.owner.id) {
			return message.channel.send(
				'`⚠️` Are you trying to get yourself into trouble?',
			);
		}

		let Reason = args.slice(1).join(' ');
		if(!Reason) {
			Reason = 'No reason provided';
		}

		const verifiedRole = settings.settings.memberrole;
		const mutedRole = settings.settings.muterole;
		if(!mutedRole) {
			return message.channel.send(
				'`❌` Mute role not found.',
			);
		}

		try {
			await member.send(`You have been muted in ${message.guild}\n\`[Reason]\` ${Reason}`);
		}
		catch(err) {
			await channel.send(`\`❌\` Failed to DM **${member.user.username}**#${member.user.discriminator} (ID: ${member.id})`);
		}

		if(verifiedRole && member.roles.cache.has(verifiedRole)) {
			member.roles.remove(verifiedRole);
		}

		member.roles.add(mutedRole);
		if(channel) {
			channel.send(
				`\`[${moment(message.createdTimestamp).format('HH:mm:ss')}]\` 🔇 **${message.author.username}**#${message.author.discriminator} muted **${member.user.username}**#${member.user.discriminator} (ID: ${member.id})\n\`[Reason]\` ${Reason}`,
			);
		}

		await message.channel.send(
			`\`✔️\` Successfully muted **${member.user.username}**#${member.user.discriminator}`,
		).then(message.delete());
	},
};