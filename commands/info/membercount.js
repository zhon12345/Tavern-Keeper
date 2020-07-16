/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const { checkMembers } = require('../../functions');
const { checkBots } = require('../../functions');

module.exports = {
	name: 'membercount',
	category: 'Info',
	description: 'Displays the guild\'s member count.',
	aliases: ['usercount'],
	usage: 'membercount',
	run: async (client, message, args) => {
		const bans = await message.guild.fetchBans();
		let embed;
		if(message.member.hasPermission('BAN_MEMBERS')) {
			embed = new MessageEmbed()
				.setTitle(`${message.guild.name}'s member count`)
				.setColor('BLUE')
				.setFooter(`Requested by ${message.author.tag} `)
				.setTimestamp()
				.setDescription([
					`**❯ Total Members:** ${message.guild.memberCount}`,
					`**❯ Humans:** ${checkMembers(message.guild)}`,
					`**❯ Bots:** ${checkBots(message.guild)}`,
					`**❯ Bans:** ${bans.size}`,
				]);
		}
		else {
			embed = new MessageEmbed()
				.setTitle(`${message.guild.name}'s member count`)
				.setColor('BLUE')
				.setDescription([
					`**❯ Total Members:** ${message.guild.memberCount}`,
					`**❯ Humans:** ${checkMembers(message.guild)}`,
					`**❯ Bots:** ${checkBots(message.guild)}`,
				]);
		}
		message.channel.send(embed);
	},
};