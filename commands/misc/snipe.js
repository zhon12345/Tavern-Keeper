const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "snipe",
	description: "Shows deleted messages from a specified channel",
	aliases: [],
	usage: "snipe [channel] [1-10]",
	category: "Misc",
	disabled: false,
	userperms: ["MANAGE_MESSAGES"],
	botperms: [],
	run: async (client, message, args) => {
		const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;
		const snipes = client.snipes.get(channel.id) || [];
		const num = isNaN(args[0]) || args[0] > 10 ? args[1] : args[0];
		const msg = snipes[num || 0];
		if (!msg) {
			return message.channel.send(`\`❌\` There is no deleted message in ${channel}`);
		}
		const embed = new MessageEmbed()
			.setAuthor(msg.author.tag, msg.author.displayAvatarURL({ format: "png", dynamic: true }))
			.setDescription(
				`Channel: ${channel} \n\n ${msg.content.length > 2000 ? `${msg.content.slice(0, 1997)}...` : msg.content}`,
			)
			.setColor("BLUE")
			.setTimestamp(msg.date);

		if (msg.image) {
			embed.setImage(msg.image);
		}
		message.channel.send(embed);
	},
};
