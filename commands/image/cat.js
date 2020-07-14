/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
	name: 'cat',
	category: 'Image',
	description: 'Get a random picture of a cat.',
	aliases: ['cats', 'kitty', 'pussy', 'meow'],
	usage: 'cat',
	guildOnly: true,
	run: async (client, message, args) => {
		const url = 'https://some-random-api.ml/img/cat';
		const facts = 'https://some-random-api.ml/facts/cat';

		let image, response;
		let fact, responses;
		try {
			response = await axios.get(url);
			image = response.data;

			responses = await axios.get(facts);
			fact = responses.data;

		}
		catch (e) {
			return message.channel.send(
				'<:vError:725270799124004934> An error occured, please try again!',
			);
		}
		const embed = new MessageEmbed()
			.setImage(image.link)
			.setTimestamp()
			.setColor('BLUE')
			.setTitle('Meow🐱');

		message.channel.send(embed);
	},
};