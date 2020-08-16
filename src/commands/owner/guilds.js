/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const { BOT_OWNER } = process.env;

module.exports = {
	name: 'guilds',
	category: 'Owner',
	description: 'Shows a list of servers that the bot is in.',
	aliases: ['servers'],
	usage: 'guilds',
	run: async (client, message, args) => {
		if(message.author.id !== BOT_OWNER) {
			return message.channel.send(
				'<:vError:725270799124004934> You must have the following permissions to use that: Bot Owner.',
			);
		}

		const list = client.guilds.cache.map(guild => `${guild.name} (${guild.id})`).join('\n');

		const botembed = new MessageEmbed()
			.setTitle(`${client.user.username}'s Server List`)
			.setDescription(list)
			.setFooter(`Total Servers: ${client.guilds.cache.size}`)
			.setColor('BLUE');
		message.channel.send(botembed);
	},
};