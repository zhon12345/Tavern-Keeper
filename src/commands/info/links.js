/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'links',
	category: 'Info',
	description: 'Returns the bot\'s links.',
	aliases: ['link', 'invite'],
	usage: 'links',
	run: async (client, message, args) => {
		const pEmbed = new MessageEmbed()
			.setTitle(`${client.user.username}'s Links`)
			.setDescription(`Here are all the related links to${client.user.username}!`)
			.setColor('BLUE')
			.addFields(
				{ name: 'Invite link', value: '[Invite](http://tiny.cc/TavernKeeper)', inline: true },
				{ name: 'Website', value: '[Website](https://tavernkeeper.ml/)', inline: true },
				{ name: 'Official Discord Server', value: '[Discord Server](https://discord.gg/GGMsqS9)', inline: true },
			);
		message.channel.send(pEmbed);
	},
};