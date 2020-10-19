/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
	name: 'youngest',
	category: 'Info',
	description: 'Get the youngest account in the guild.',
	aliases: [],
	usage: 'youngest',
	run: async (client, message, args) => {
		const member = message.guild.members.cache
			.filter((m) => !m.user.bot)
			.sort((a, b) => b.user.createdAt - a.user.createdAt)
			.first();
		const Embed = new MessageEmbed()
			.setTitle(`Youngest user in ${message.guild.name}`)
			.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
			.setColor('BLUE')
			.setFooter(`Requested by ${message.author.tag} `)
			.setTimestamp()
			.setDescription([
				`**${member.user.username}**#${member.user.discriminator} (ID: ${member.user.id}) is the youngest user in **${message.guild.name}**!`,
			])
			.addFields(
				{ name: 'Created on:', value: `${moment(member.user.createdTimestamp).format('MMMM Do YYYY, h:mm:ss')} | ${Math.floor((Date.now() - member.user.createdTimestamp) / 86400000)} day(s) ago` },
				{ name: 'Joined on:', value: `${moment(member.joinedAt).format('MMMM Do YYYY, h:mm:ss')} | ${Math.floor((Date.now() - member.joinedAt) / 86400000)} day(s) ago` },
			);
		message.channel.send(Embed);
	},
};