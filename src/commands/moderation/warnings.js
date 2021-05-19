const User = require('../../models/user');
const Guild = require('../../models/guild');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'warnings',
	category: 'Moderation',
	description: 'Get the warnings and other info of the message author or a specified user.',
	aliases: ['warns', 'strikes'],
	usage: 'warnings [user]',
	disabled: false,
	userperms: [],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;
		if (!member) {
			return message.channel.send(
				'`❌` Please provide a valid user.',
			);
		}
		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});

		User.find({
			guildID: message.guild.id,
			userID: member.id,
		}, async (err, data) => {
			const bannedUsers = await message.guild.fetchBans();
			const embed = new MessageEmbed()
				.setTitle('Moderation Information')
				.setColor('BLUE')
				.setFooter(`Requested by ${message.author.tag} `)
				.setTimestamp()
				.addField('<:documents:773950876347793449> General ❯', [
					`> **<:card:773965449402646549> Username: \`${member.user.tag}\`**`,
					`> **\\📇 User ID: \`${member.id}\`**`,
					`> **\\🤐 Muted: \`${member.roles.cache.has(settings.settings.muterole) ? 'Yes' : 'No'}\`**`,
					`> **\\🔨 Banned: \`${bannedUsers.get(member.id) ? 'Yes' : 'No'}\`**`,
					'\u200b',
				])
				.addField('<:documents:773950876347793449> Warnings ❯',
					data && data.map(d => d.warnings.length) > 0 ? data.map((d) => {return d.warnings.map((w, i) => {return `> **${i + 1} - \`${w.code}\`**\n> **Moderator: ${message.guild.members.cache.get(w.moderatorID)}(\`${w.moderator}\`)**\n> **Reason: \`${w.reason}\`**`;}).join('\n> \n');}) : '> `None`',
				);
			message.channel.send(embed);
		});
	},
};