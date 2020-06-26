/* eslint-disable no-empty */
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const db = require('quick.db');

module.exports = async (oldMessage, newMessage) => {
	if(oldMessage.author.bot) {return;}
	else {
		const embed = new MessageEmbed()
			.setFooter(`User ID: ${oldMessage.author.id}`)
			.setColor('YELLOW')
			.addFields(
				{ name: 'Channel:', value: oldMessage.channel },
				{ name: 'Before', value: oldMessage.content, inline: true },
				{ name: 'After', value: newMessage.content, inline: true },
			);
		const logs = db.fetch(`messagelog_${oldMessage.guild.id}`);
		const channel = oldMessage.guild.channels.cache.get(logs);
		if (!channel) return;
		channel.send(
			`\`[${moment(newMessage.createdTimestamp).format('HH:mm:ss')}]\` ✏️ **${oldMessage.author.username}**#${oldMessage.author.discriminator} (ID: ${oldMessage.author.id}) edited a message.`, embed,
		);
	}
};