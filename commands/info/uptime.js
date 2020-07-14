/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const { parseDurs } = require('../../functions');

module.exports = {
	name: 'uptime',
	description: 'Check the bot\'s uptime.',
	category: 'Info',
	aliases: [ 'ontime' ],
	usage: 'uptime',
	run: async (client, message, args) => {
		const duration = parseDurs(client.uptime);
		message.channel.send('⌛ Loading...').then((msg) => {
			const pEmbed = new MessageEmbed()
				.setTitle(':inbox_tray: Online for')
				.setColor('BLUE')
				.setDescription(
					`${duration}`,
				);
			msg.edit(pEmbed);
		});
	},
};