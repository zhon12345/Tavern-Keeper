const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'serveravatar',
	description: 'Displays server\'s avatar',
	usage: 'serverinfo',
	category: 'Misc',
	aliases: ['sav'],
	userperms: [],
	botperms: [],
	run: async (client, message, args) => {
		const guild = client.guilds.cache.get(args[0]) || message.guild;
		const avatar = guild.iconURL({ size: 256, dynamic: true });
		const embed = new MessageEmbed()
			.setTitle(`${guild.name}'s avatar`)
			.setURL(avatar)
			.setImage(avatar)
			.setColor('BLUE')
			.setFooter(`Requested by ${message.author.tag}`)
			.setTimestamp();
		message.channel.send(embed);

	},
};