const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'snipe',
	description: 'Shows the last deleted message from a specified channel',
	aliases: [],
	usage: 'snipe [number]',
	category: 'Misc',
	disabled: false,
	userperms: [],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;
		const snipes = client.snipes.get(channel.id) || [];
		const msg = snipes[args[0] || 0];
		if (!msg) {
			return message.channel.send(
				`\`❌\` There is no deleted message in ${channel}`,
			);
		}
		const embed = new MessageEmbed()
			.setAuthor(msg.author.tag, msg.author.displayAvatarURL({ format: 'png', dynamic: true }))
			.setDescription(msg.content.length > 2048 ? `${msg.content.slice(0, 2045)}...` : msg.content)
			.setColor('BLUE')
			.setTimestamp(msg.date);

		if(msg.image) {
			embed.setImage(msg.image);
		}
		message.channel.send(embed);
	},
};