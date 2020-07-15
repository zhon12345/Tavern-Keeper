/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	name: 'cat',
	category: 'Image',
	description: 'Get a random picture of a cat.',
	aliases: ['cats', 'kitty', 'pussy', 'meow'],
	usage: 'cat',
	guildOnly: true,
	run: async (client, message, args) => {
		const url = 'https://some-random-api.ml/img/cat';

		let response;
		try {
			response = await fetch(url).then(res => res.json());
		}
		catch (e) {
			return message.channel.send(
				'<:vError:725270799124004934> An error occured, please try again!',
			);
		}
		const embed = new MessageEmbed()
			.setImage(response.link)
			.setTimestamp()
			.setColor('BLUE')
			.setTitle('Meow🐱');

		message.channel.send(embed);
	},
};