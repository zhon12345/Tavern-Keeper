/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	name: 'rabbits',
	category: 'Animals',
	description: 'Bunnies! Aren\'t they cute?',
	aliases: ['rabbit', 'bunny', 'bunnies'],
	usage: 'rabbits',
	run: async (client, message, args) => {
		const url = 'https://api.bunnies.io/v2/loop/random/?media=gif,png';

		let response;
		try {
			response = await fetch(url)
				.then(res => res.json());
		}
		catch (e) {
			return message.channel.send(
				'<:vError:725270799124004934> An error occured, please try again!',
			);
		}

		const embed = new MessageEmbed()
			.setColor('BLUE')
			.setImage(response.media.gif);
		message.channel.send(embed);
	},
};