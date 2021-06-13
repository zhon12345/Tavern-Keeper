const { MessageEmbed } = require('discord.js');
const { pfpStr } = require('../../functions');

module.exports = {
	name: 'avatar',
	category: 'Misc',
	description: 'Get the avatar of the message author or a specified user.',
	aliases: ['pfp', 'icon'],
	usage: 'avatar [user]',
	disabled: false,
	userperms: [],
	botperms: [],
	run: async (client, message, args) => {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;

		const avatar = member.user.displayAvatarURL({ size: 256, dynamic: true });
		const isGif = avatar.slice(0, -9).endsWith('gif');
		const desc = `[png](${await pfpStr(avatar, isGif, 'png')}) | [jpg](${pfpStr(avatar, isGif, 'jpg')}) | [webp](${pfpStr(avatar, isGif, 'webp')})`;

		const embed = new MessageEmbed()
			.setTitle(`${member.user.tag}'s avatar`)
			.setDescription(isGif ? `**${desc} | [gif](${avatar})**` : `**${desc}**`)
			.setImage(avatar)
			.setColor('BLUE')
			.setFooter(`Requested by ${message.author.tag}`)
			.setTimestamp();
		message.channel.send(embed);
	},
};