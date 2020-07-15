/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	name: 'dog',
	category: 'Image',
	description: 'Get a random picture of a dog.',
	aliases: ['dogs', 'doggo', 'puppy', 'puppies'],
	usage: 'dog',
	guildOnly: true,
	run: async (client, message, args) => {
		const url = 'https://some-random-api.ml/img/dog';

		let response;
		try {
			response = await fetch(url).then(res => res.json());
		}
		catch (e) {
			return message.channel.send('An error occured, please try again!');
		}

		const embed = new MessageEmbed()
			.setImage(response.link)
			.setTimestamp()
			.setColor('BLUE')
			.setTitle('Bork Bork!🐶');

		message.channel.send(embed);
	},
};