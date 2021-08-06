const { parseDur } = require('../../functions');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const types = {
	dm: 'DM',
	text: 'Text',
	voice: 'Voice',
	category: 'Category',
	news: 'News',
	store: 'Store',
	unknown: 'Unknown',
};

module.exports = {
	name: 'channelinfo',
	category: 'Info',
	description: 'Displays information about a provided channel.',
	aliases: ['channel', 'ci'],
	usage: 'channelinfo [channel]',
	disabled: false,
	userperms: [],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;
		if(!channel) {
			return message.channel.send(
				'`❌` Please provide a valid channel',
			);
		}

		const embed = new MessageEmbed()
			.setFooter(`Requested by ${message.author.tag} `)
			.setTimestamp()
			.setColor('BLUE')
			.setTitle('Channel Information')
			.addField('<:documents:773950876347793449> General ❯', [
				`> **<:card:773965449402646549> Channel Name: \`${channel.name}\`**`,
				`> **\\📇 Channel ID: \`${channel.id}\`**`,
				`> **\\🗃️ Channel Type: \`${types[channel.type]}\`**`,
				`> **\\⏰ Slowmode: ${isNaN(channel.rateLimitPerUser) ? '`None`' : parseDur(channel.rateLimitPerUser * 1000)}**`,
				`> **\\🔞 NSFW: \`${channel.nsfw ? 'Yes' : 'No'}\`**`,
				`> **\\📅 Created: \`${moment(channel.createdTimestamp).format('MMMM Do YYYY, h:mm:ss')}\` | \`${Math.floor((Date.now() - channel.createdTimestamp) / 86400000)}\` day(s) ago**`,
				'\u200b',
			])
			.addField('<:documents:773950876347793449> Channel Topic ❯', [
				`> ${channel.topic ? channel.topic : '`None`'}`,
			]);

		return message.channel.send(embed);
	},
};