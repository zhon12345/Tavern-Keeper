const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'avatar',
	category: 'Misc',
	description: 'Get the avatar of the message author or a specified user.',
	aliases: ['pfp', 'icon'],
	usage: 'avatar [user]',
	run: async (client, message, args) => {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;
		const avatar = member.user.displayAvatarURL({ size: 256, dynamic: true });
		const embed = new MessageEmbed()
			.setTitle(`${member.user.tag}'s avatar`)
			.setURL(avatar)
			.setImage(avatar)
			.setColor('BLUE')
			.setFooter(`Requested by ${message.author.tag}`)
			.setTimestamp();
		message.channel.send(embed);
	},
};