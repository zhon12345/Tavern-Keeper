/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'iq',
	category: 'Fun',
	description: 'Randomise your IQ.',
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
				);
			msg.edit(Embed);
		});
	},
};