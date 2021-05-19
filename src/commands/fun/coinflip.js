/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');


module.exports = {
	name: 'coinflip',
	category: 'Fun',
	description: 'Flip a coin and see what you get. Heads or Tails?',
	aliases: ['cf', 'coinf'],
	usage: 'coinflip',
	disabled: false,
	userperms: [],
	botperms: [],
	run: async (client, message, args) => {
		const responses = ['Heads', 'Tails'];
		const response =
		responses[Math.floor(Math.random() * responses.length)];
		message.channel.send(' Flipping...').then((msg) => {
			const Embed = new MessageEmbed()
				.setTitle('You filpped a . .')
				.setColor('BLUE')
				.setDescription(
					`${response}!`,
				)
				.setFooter(`Requested by ${message.author.tag}`)
				.setTimestamp();
			msg.edit(Embed);
		});
	},
};