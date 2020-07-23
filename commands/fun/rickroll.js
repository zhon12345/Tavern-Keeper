/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'rickroll',
	category: 'Fun',
	description: 'Sends a link to the "Never Gonna Give You Up" music video.',
	aliases: [],
	usage: 'rickroll',
	run: async (client, message, args) => {
		const embed = new MessageEmbed()
			.setColor('BLUE')
			.setDescription('A mysterious link appears! Click [here](https://www.youtube.com/watch?v=dQw4w9WgXcQ) to view it!');
		message.channel.send(embed).then(message.delete());
	},
};