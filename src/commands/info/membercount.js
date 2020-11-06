const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'membercount',
	category: 'Info',
	description: 'Displays the specified guild\'s member count.',
	aliases: ['usercount', 'uc', 'mc'],
	usage: 'membercount',
	run: async (client, message, args) => {
		const guild = client.guilds.cache.get(args[0]) || message.guild;
		const members = guild.members.cache;
		const embed = new MessageEmbed()
			.setTitle(`${guild.name}'s member count`)
			.setColor('BLUE')
			.setFooter(`Requested by ${message.author.tag} `)
			.setTimestamp()
			.addField('<:documents:773950876347793449> General ❯', [
				`> **\\👤 Humans: \`${members.filter(member => !member.user.bot).size}\`**`,
				`> **\\🤖 Bots: \`${members.filter(member => member.user.bot).size}\`**`,
				`> **\\👥 Total Members: \`${guild.memberCount}\`**`,
			])
			.addField('<:documents:773950876347793449> Presence ❯', [
				`> **<:online:745651877382717560> Online: \`${members.filter(member => member.presence.status === 'online').size}\`**`,
				`> **<:idle:773964101390958632> Idle: \`${members.filter(member => member.presence.status === 'idle').size}\`**`,
				`> **<:dnd:773964313630998538> Do Not Disturb: \`${members.filter(member => member.presence.status === 'dnd').size}\`**`,
				`> **<:offline:745651876552376402> Offline: \`${members.filter(member => member.presence.status === 'offline').size}\`**`,
			]);
		message.channel.send(embed);
	},
};