/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
	name: 'dog',
	category: 'Image',
	description: 'Get a random picture of a dog.',
	aliases: ['dogs', 'doggo', 'puppy', 'puppies'],
	usage: 'dog',
	guildOnly: true,
	run: async (client, message, args) => {
		const url = 'https://some-random-api.ml/img/dog';

		let image, response;
		let fact, responses;
		try {
			response = await axios.get(url);
			image = response.data;
		}
		catch (e) {
			return message.channel.send('An error occured, please try again!');
		}

		const embed = new MessageEmbed()
			.setImage(image.link)
			.setTimestamp()
			.setColor('BLUE')
			.setTitle('Bork Bork!🐶');

		message.channel.send(embed);
	},
};