/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const { sourcebin } = require('../../functions');

module.exports = {
	name: 'guilds',
	category: 'Owner',
	description: 'Shows a list of servers that the bot is in.',
	aliases: ['servers'],
	usage: 'guilds',
	disabled: false,
	userperms: ['BOT_OWNER'],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		const list = client.guilds.cache.sort((a, b) => a.joinedAt - b.joinedAt).map(guild => `${guild.name} (${guild.id})`).join('\n');

		const response = await sourcebin(`${client.user.username}'s server list`, '', '', list);
		const botembed = new MessageEmbed()
			.setColor('BLUE')
			.setDescription(`**${client.user.username}** is currently in **${message.client.guilds.cache.size}** servers. ${list.length > 1024 ? `\nThe server list exceeds the character limit, click [here](${response}) for the full list` : ''}`)
			.addField('Servers', list.length > 1024 ? `${list.slice(0, 1021)}...` : list);
		message.channel.send(botembed);
	},
};