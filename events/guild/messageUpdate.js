const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const Guild = require("../../models/guild");

module.exports = async (client, oldMessage, newMessage) => {
	const settings = await Guild.findOne({
		guildID: newMessage.guild.id,
	});

	if (oldMessage.author.bot) return;
	if (oldMessage.content === newMessage.content) return;

	const embed = new MessageEmbed().setColor("YELLOW").addFields(
		{
			name: "Before",
			value:
				oldMessage.attachments.size > 0
					? oldMessage.attachments.first().proxyURL
					: oldMessage.content >= 1024
						? `${oldMessage.content.slice(0, 1021)}...`
						: oldMessage.content,
			inline: true,
		},
		{
			name: "After",
			value:
				newMessage.attachments.size > 0
					? newMessage.attachments.first().proxyURL
					: newMessage.content >= 1024
						? `${newMessage.content.slice(0, 1021)}...`
						: newMessage.content,
			inline: true,
		},
	);

	const channel = oldMessage.guild.channels.cache.get(settings.settings.messagelog);
	if (!channel) return;

	if (oldMessage !== newMessage) {
		channel.send(
			`\`[${moment(Date.now()).format("HH:mm:ss")}]\` ✏️ **${oldMessage.author.username}**#${oldMessage.author.discriminator} (ID: ${oldMessage.author.id}) edited a message in ${oldMessage.channel}.`,
			embed,
		);
	}
};
