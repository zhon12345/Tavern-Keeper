/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'invite',
	category: 'Info',
	description: 'Returns the bot\'s invite links.',
	aliases: ['latency'],
	usage: 'ping',
	run: async (client, message, args) => {
		const pEmbed = new MessageEmbed()
			.setTitle(`${client.user.username}'s Links`)
			.setDescription(`Here are all the related links to${client.user.username}!`)
			.setColor('BLUE')
			.addFields(
				{
					name: 'Invite link',
					value: 'Coming Soon...',
				},
				{
					name: 'Website',
					value: '[Website](https://tavern-keeper.weebly.com/)',
				},
				{
					name: 'Official Discord Server',
					value: '[Discord Server](https://discord.gg/WS3GthM)',
				},
			);
		message.channel.send(pEmbed);
	},
};