/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'iq',
	category: 'Fun',
	description: ' ̶ R̶a̶n̶d̶o̶m̶i̶s̶e̶  Calculate your IQ..',
	aliases: [],
	usage: 'iq',
	run: async (client, message, args) => {

		const love = Math.floor(Math.random() * 130) + 1;

		message.channel.send('⚙️ Calculating...').then((msg) => {
			const Embed = new MessageEmbed()
				.setTitle('🧠 Your IQ is ...')
				.setColor('BLUE')
				.setDescription(
					`${love}!`,
				)
				.setFooter(`Requested by ${message.author.tag}`)
				.setTimestamp();
			msg.edit(Embed);
		});
	},
};