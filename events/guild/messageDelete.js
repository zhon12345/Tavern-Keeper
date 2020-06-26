/* eslint-disable no-empty */
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const db = require('quick.db');

module.exports = async (message) => {
	if (message.author.bot) {return;}
	else {
		const embed = new MessageEmbed()
			.setFooter(`User ID: ${message.author.id}`)
			.setColor('RED')
			.addFields(
				{ name: 'Channel:', value:`${message.channel}` },
				{ name: 'Content:', value:`${message.content}` },
			);
		const logs = db.fetch(`messagelog_${message.guild.id}`);
		const channel = message.guild.channels.cache.get(logs);
		if (!channel) return;
		channel.send(
			`\`[${moment(message.createdTimestamp).format('HH:mm:ss')}]\` ❌ **${message.author.username}**#${message.author.discriminator} (ID: ${message.author.id})'s message has been deleted.`, embed,
		);
	}
};