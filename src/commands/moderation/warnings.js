const User = require('../../models/user');
const Guild = require('../../models/guild');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'warnings',
	category: 'Moderation',
	description: 'Get the warnings and other info of the message author or a specified user.',
	aliases: ['warns', 'strikes'],
	usage: 'warnings [user]',
	userperms: [],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;
		if (!member) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid user.',
			);
		}
		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});

		const warns = await User.findOne({
			guildID: message.guild.id,
			userID: member.id,
		});

		let warnings;
		if (!warns || warns.warnings === 0) {
			warnings = 0;
		}
		else {
			warnings = warns.warnings;
		}

		const mute = settings.settings.muterole;
		const bannedUsers = await message.guild.fetchBans();
		const embed = new MessageEmbed()
			.setTitle('Moderation Information')
			.setColor('BLUE')
			.setFooter(`Requested by ${message.author.tag} `)
			.setTimestamp()
			.addField('<:documents:773950876347793449> General ❯', [
				`> **<:card:773965449402646549> Username: \`${member.user.tag}\`**`,
				`> **\\📇 User ID: \`${member.id}\`**`,
				`> **\\🚩 Strikes: \`${warnings}\` Strikes**`,
				`> **\\🤐 Muted: \`${member.roles.cache.has(mute) ? 'Yes' : 'No'}\`**`,
				`> **\\🔨 Banned: \`${bannedUsers.get(member.id) ? 'Yes' : 'No'}\`**`,
			]);
		message.channel.send(embed);
	},
};