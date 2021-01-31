/* eslint-disable no-empty */
const { MessageEmbed } = require("discord.js");
const Guild = require("../../models/guild");
const moment = require("moment");

module.exports = async (client, message) => {
	if (message.author.bot) return;
	if(!message.guild.me.hasPermission("VIEW_AUDIT_LOG")) return;
	const settings = await Guild.findOne({
		guildID: message.guild.id,
	});

	const fetchedLogs = await message.guild.fetchAuditLogs({
		limit: 1,
		type: "MESSAGE_DELETE",
	});

	const channel = message.guild.channels.cache.get(settings.settings.messagelog);
	if (!channel) return;

	if(fetchedLogs.entries.first().executor.id !== message.author.id) {
		const embed = new MessageEmbed()
			.setColor("RED")
			.addFields(
				{ name: "Content:", value:`${message.attachments.size > 0 ? message.attachments.first().proxyURL : message.content >= 1024 ? `${message.content.slice(0, 1021)}...` : message.content}` },
			);
		channel.send(
			`\`[${moment(Date.now()).format("HH:mm:ss")}]\` ❌ **${message.author.username}**#${message.author.discriminator} (ID: ${message.author.id})'s message has been deleted by **${fetchedLogs.entries.first().executor.username}**#${fetchedLogs.entries.first().executor.discriminator} in ${message.channel}.`, embed,
		);
	}
	else {
		const embed = new MessageEmbed()
			.setColor("RED")
			.addFields(
				{ name: "Content:", value:`${message.attachments.size > 0 ? message.attachments.first().proxyURL : message.content >= 1024 ? `${message.content.slice(0, 1021)}...` : message.content}` },
			);
		channel.send(
			`\`[${moment(Date.now()).format("HH:mm:ss")}]\` ❌ **${message.author.username}**#${message.author.discriminator} (ID: ${message.author.id}) deleted a message in ${message.channel}.`, embed,
		);
	}
};