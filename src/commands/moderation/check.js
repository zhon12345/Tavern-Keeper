const User = require('../../models/user');
const Guild = require('../../models/guild');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'check',
	category: 'Moderation',
	description: 'Get the warnings and other info of the message author or a specified user.',
	aliases: ['warnings', 'warns'],
	usage: 'check [user]',
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

		let warnings = warns.warnings;
		if(!warnings) warnings = 0;

		const mute = settings.settings.muterole;
		const embed = new MessageEmbed()
			.setTitle('Moderation information')
			.setColor('BLUE')
			.setFooter(`Requested by ${message.author.tag} `)
			.setTimestamp()
			.addFields(
				{ name: 'Username', value: `\`\`\`${member.user.tag}\`\`\``, inline:true },
				{ name: 'ID', value: `\`\`\`${member.id}\`\`\``, inline:true },
				{ name: 'Strikes', value: `\`\`\`${warnings}\`\`\`` },
				{ name: 'Muted', value: `\`\`\`${member.roles.cache.has(mute) ? 'Yes' : 'No'}\`\`\`` },
			);
		message.channel.send(embed);
	},
};