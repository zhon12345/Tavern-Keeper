/* eslint-disable no-empty */
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const db = require('quick.db');

module.exports = async (client, message) => {
	if (message.author.bot) return;
	const fetchedLogs = await message.guild.fetchAuditLogs({
		limit: 1,
		type: 'MESSAGE_DELETE',
	});
	const deletionLog = fetchedLogs.entries.first();
	const { executor, target } = deletionLog;

	const logs = db.fetch(`messagelog_${message.guild.id}`);
	const channel = message.guild.channels.cache.get(logs);
	if (!channel || channel === null) {return;}
	else if(target.id === message.author.id) {
		const embed = new MessageEmbed()
			.setColor('RED')
			.addFields(
				{ name: 'Channel:', value:`${message.channel}` },
				{ name: 'Content:', value:`${message.content}` },
			);
		channel.send(
			`\`[${moment(Date.now()).format('HH:mm:ss')}]\` ❌ **${message.author.username}**#${message.author.discriminator} (ID: ${message.author.id})'s message has been deleted by **${executor.username}**#${executor.discriminator}.`, embed,
		);
	}
	else {
		const embed = new MessageEmbed()
			.setColor('RED')
			.addFields(
				{ name: 'Channel:', value:`${message.channel}` },
				{ name: 'Content:', value:`${message.content}` },
			);
		channel.send(
			`\`[${moment(Date.now()).format('HH:mm:ss')}]\` ❌ **${message.author.username}**#${message.author.discriminator} (ID: ${message.author.id}) deleted a message.`, embed,
		);
	}
};