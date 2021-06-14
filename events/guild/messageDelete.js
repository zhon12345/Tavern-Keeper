/* eslint-disable no-empty */
const { MessageEmbed } = require("discord.js");
const Guild = require("../../models/guild");
const moment = require("moment");

module.exports = async (client, message) => {
	if (message.author.bot) return;
	const snipes = message.client.snipes.get(message.channel.id) || [];
	snipes.unshift({
		content: message.content,
		author: message.author,
		image: message.attachments.first() ? message.attachments.first().proxyURL : null,
		date: new Date(),
	});

	snipes.splice(10);
	message.client.snipes.set(message.channel.id, snipes);

	const settings = await Guild.findOne({
		guildID: message.guild.id,
	});

	const channel = message.guild.channels.cache.get(settings.settings.messagelog);
	if (!channel) return;

	const embed = new MessageEmbed()
		.setColor("RED")
		.addFields(
			{ name: "Content:", value:`${message.attachments.size > 0 ? message.attachments.first().proxyURL : message.content >= 1024 ? `${message.content.slice(0, 1021)}...` : message.content}` },
		);
	channel.send(
		`\`[${moment(Date.now()).format("HH:mm:ss")}]\` ❌ **${message.author.username}**#${message.author.discriminator} (ID: ${message.author.id})'s message was deleted from ${message.channel}.`, embed,
	);
};