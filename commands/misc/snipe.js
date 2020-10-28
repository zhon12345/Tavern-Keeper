const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'snipe',
	description: 'Shows the last deleted message from a specified channel',
	aliases: [],
	usage: 'snipe',
	category: 'Misc',
	run: async (client, message, args) => {
		const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;
		const msg = client.snipes.get(channel.id);
		if (!msg) {
			return message.channel.send(
				'<:vError:725270799124004934> There is no deleted message.',
			);
		}
		const embed = new MessageEmbed()
			.setAuthor(msg.author.tag, msg.author.displayAvatarURL({ format: 'png', dynamic: true }))
			.setDescription(msg.content)
			.setColor('BLUE')
			.setTimestamp();

		if(msg.image) {
			embed.setImage(msg.image);
		}
		message.channel.send(embed);

	},
};