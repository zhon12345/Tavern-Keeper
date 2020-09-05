/* eslint-disable no-empty */
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const Guild = require('../../models/guild');

module.exports = async (client, oldMessage, newMessage) => {
	const settings = await Guild.findOne({
		guildID: newMessage.guild.id,
	});

	if(oldMessage.author.bot) {return;}
	else {
		const embed = new MessageEmbed()
			.setColor('YELLOW')
			.addFields(
				{ name: 'Before', value: oldMessage.attachments.size > 0 ? oldMessage.attachments.first().proxyURL : oldMessage.content, inline: true },
				{ name: 'After', value: newMessage.attachments.size > 0 ? newMessage.attachments.first().proxyURL : newMessage.content, inline: true },
			);
		const logs = settings.settings.messagelog;
		const channel = oldMessage.guild.channels.cache.get(logs);
		if (!channel) return;
		channel.send(
			`\`[${moment(newMessage.createdTimestamp).format('HH:mm:ss')}]\` ✏️ **${oldMessage.author.username}**#${oldMessage.author.discriminator} (ID: ${oldMessage.author.id}) edited a message in ${oldMessage.channel}.`, embed,
		);
	}
};