const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'membercount',
	category: 'Info',
	description: 'Displays the guild\'s member count.',
	aliases: ['usercount'],
	usage: 'membercount',
	run: async (client, message, args) => {
		const guild = client.guilds.cache.get(args[0]) || message.guild;
		const members = guild.members.cache;
		const bans = await guild.fetchBans();
		let embed;
		if(message.member.hasPermission('BAN_MEMBERS')) {
			embed = new MessageEmbed()
				.setTitle(`${guild.name}'s member count`)
				.setColor('BLUE')
				.setFooter(`Requested by ${message.author.tag} `)
				.setTimestamp()
				.setDescription([
					`**❯ Total Members:** ${guild.memberCount}`,
					`**❯ Humans:** ${members.filter(member => !member.user.bot).size}`,
					`**❯ Bots:** ${members.filter(member => member.user.bot).size}`,
					`**❯ Bans:** ${bans.size}`,
				]);
		}
		else {
			embed = new MessageEmbed()
				.setTitle(`${guild.name}'s member count`)
				.setColor('BLUE')
				.setDescription([
					`**❯ Total Members:** ${guild.memberCount}`,
					`**❯ Humans:** ${members.filter(member => !member.user.bot).size}`,
					`**❯ Bots:** ${members.filter(member => member.user.bot).size}`,
				]);
		}
		message.channel.send(embed);
	},
};