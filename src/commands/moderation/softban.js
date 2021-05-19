const moment = require('moment');
const Guild = require('../../models/guild');

module.exports = {
	name: 'softban',
	category: 'Moderation',
	description: 'Softban a specified user from the server.',
	aliases: [],
	usage: 'softban <user> [reason]',
	disabled: false,
	userperms: ['BAN_MEMBERS'],
	botperms: ['USE_EXTERNAL_EMOJIS', 'BAN_MEMBERS'],
	run: async (client, message, args) => {
		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});

		const channel = message.guild.channels.cache.get(settings.settings.modlog);
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);
		if (!member) {
			return message.channel.send(
				'`❌` Please provide a valid user.',
			);
		}

		if(member.id === message.author.id) {
			return message.channel.send(
				'`❌` You are not allowed to softban yourself.',
			);
		}

		if(member.id === client.user.id) {
			return message.channel.send(
				'`❌` You are not allowed to softban me.',
			);
		}

		if(member.id === message.guild.owner.id) {
			return message.channel.send(
				'`⚠️` Are you trying to get yourself into trouble?',
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
				'`❌` You are not allowed ban this user.',
			);
		}

		try {
			await member.send(`You have been softbanned from ${message.guild}\n\`[Reason]\` ${Reason}`);
		}
		catch(err) {
			await channel.send(`\`❌\` Failed to DM **${member.user.username}**#${member.user.discriminator} (ID: ${member.id})`);
		}

		member.ban().then(
			message.guild.members.unban(member.user),
		);

		if(channel) {
			channel.send(
				`\`[${moment(message.createdTimestamp).format('HH:mm:ss')}]\` 🔨 **${message.author.username}**#${message.author.discriminator} softbanned **${member.user.username}**#${member.user.discriminator} (ID: ${member.id})\n\`[Reason]\` ${Reason}`,
			);
		}

		await message.channel.send(
			`\`✔️\` Successfully softbanned **${member.user.username}**#${member.user.discriminator}`,
		).then(message.delete());
	},
};