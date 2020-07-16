/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'members',
	category: 'Info',
	description: 'Provides a list of members in the specified role.',
	aliases: [],
	usage: 'members <role>',
	run: async (client, message, args) => {
		const members = message.guild.members.cache.map(m=>m.user.tag).join('\n');
		const embed = new MessageEmbed()
			.setTitle(`Members in **${message.guild.name}**`)
			.setColor('BLUE')
			.setDescription(`${members}`)
			.setFooter(`Requested by ${message.author.tag} `)
			.setTimestamp();

		message.channel.send(embed);
	},
};