/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const { ownerid } = process.env;

module.exports = {
	name: 'guilds',
	category: 'Owner',
	description: 'Shows a list of servers that the bot is in.',
	aliases: ['servers'],
	usage: 'guilds',
	run: async (client, message, args) => {
		if (message.author.id !== ownerid) return;

		const list = client.guilds.cache.map(guild => `${guild.name} (${guild.id})`).join('\n');

		const botembed = new MessageEmbed()
			.setDescription(`**${client.user.username}** is currently in **${message.client.guilds.cache.size}** servers.`)
			.setColor('BLUE')
			.addField('Servers', list);
		message.channel.send(botembed);
	},
};