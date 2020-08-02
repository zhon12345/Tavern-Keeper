/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'links',
	category: 'Info',
	description: 'Returns the bot\'s links.',
	aliases: ['link'],
	usage: 'links',
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
					value: '[Website](https://tavernkeeper.ml/)',
				},
				{
					name: 'Official Discord Server',
					value: '[Discord Server](https://discord.gg/GGMsqS9)',
				},
			);
		message.channel.send(pEmbed);
	},
};